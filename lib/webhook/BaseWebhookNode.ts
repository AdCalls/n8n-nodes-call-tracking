import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import type { WebhookNodeConfig } from './types';
import { verifyWebhookSecret } from './verification';
import { secretProperty, webhookPathProperty } from './descriptions';

/**
 * Registry to store configs by node name.
 * This is needed because n8n replaces `this` context in webhook methods.
 */
const configRegistry = new Map<string, WebhookNodeConfig<unknown>>();

/**
 * Abstract base class for webhook nodes.
 *
 * Uses composition to build the INodeTypeDescription from config rather than
 * requiring subclasses to override a static property.
 *
 * @example
 * ```typescript
 * const config: WebhookNodeConfig<MyPayload> = {
 *   name: 'myWebhook',
 *   displayName: 'My Webhook',
 *   description: 'Receives webhooks from My Service',
 *   icon: 'file:myIcon.svg',
 *   defaultPath: 'my-webhook',
 *   transformPayload: (payload) => [{ json: payload }],
 * };
 *
 * export class MyWebhook extends BaseWebhookNode<MyPayload> {
 *   constructor() {
 *     super(config);
 *   }
 * }
 * ```
 */
export abstract class BaseWebhookNode<TPayload = unknown> implements INodeType {
	description: INodeTypeDescription;

	constructor(config: WebhookNodeConfig<TPayload>) {
		// Register config in the registry for later retrieval in webhook method
		configRegistry.set(config.name, config as WebhookNodeConfig<unknown>);
		this.description = this.buildDescription(config);
	}

	/**
	 * Builds the node description from configuration.
	 */
	private buildDescription(config: WebhookNodeConfig<TPayload>): INodeTypeDescription {
		return {
			displayName: config.displayName,
			name: config.name,
			icon: config.icon,
			group: ['trigger'],
			version: 1,
			description: config.description,
			defaults: {
				name: config.displayName,
			},
			inputs: [],
			outputs: [NodeConnectionTypes.Main],
			webhooks: [
				{
					name: 'default',
					httpMethod: 'POST',
					path: '={{$parameter["path"]}}',
					responseMode: 'onReceived',
					isFullPath: false,
					nodeType: 'webhook',
				},
			],
			properties: [
				webhookPathProperty(config.defaultPath),
				secretProperty,
				...(config.additionalProperties ?? []),
			],
		};
	}

	/**
	 * Main webhook handler - shared logic for all concrete nodes.
	 * Note: n8n replaces `this` with IWebhookFunctions, so we retrieve
	 * the config from the registry using the node name.
	 */
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const nodeType = this.getNode().type;
		// n8n prefixes community nodes with "CUSTOM.", so we strip it for lookup
		const nodeName = nodeType.replace(/^CUSTOM\./, '');
		const config = configRegistry.get(nodeName) as WebhookNodeConfig<TPayload> | undefined;

		if (!config) {
			throw new Error(`Config not found for node: ${nodeName}`);
		}

		const res = this.getResponseObject();
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData();

		// Step 1: Verify secret if configured
		const secret = this.getNodeParameter('webhookSecret', '') as string;
		if (!verifyWebhookSecret(headerData, secret)) {
			res.status(401).json({ error: 'Invalid secret' });
			return { noWebhookResponse: true };
		}

		// Step 2: Validate payload if validator provided
		if (!config.validatePayload(bodyData)) {
			res.status(400).json({ error: 'Invalid payload' });
			return { noWebhookResponse: true };
		}

		// Step 3: Transform payload
		const transformedData = await config.transformPayload(bodyData as TPayload, this);

		// Step 4: Optionally include raw body and headers
		const options = this.getNodeParameter('options', {}) as IDataObject;
		if (options.includeRawBody || options.includeHeaders) {
			for (const item of transformedData) {
				if (options.includeRawBody) {
					item.json._rawBody = bodyData;
				}
				if (options.includeHeaders) {
					item.json._headers = headerData as unknown as IDataObject;
				}
			}
		}

		// Step 5: Build response
		const webhookResponse = config.getWebhookResponse
			? config.getWebhookResponse(bodyData as TPayload, this)
			: { code: 200, message: 'ok' };

		return {
			workflowData: [transformedData],
			webhookResponse,
		};
	}
}
