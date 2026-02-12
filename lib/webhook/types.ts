import type {
	IDataObject,
	INodeExecutionData,
	INodeProperties,
	INodeTypeDescription,
	IWebhookFunctions,
} from 'n8n-workflow';

/**
 * Configuration interface that concrete webhook nodes must provide
 */
export interface WebhookNodeConfig<TPayload = unknown> {
	/** Unique internal name for the node (e.g., 'adCallsWebhook') */
	name: string;

	/** Display name shown in n8n UI (e.g., 'AdCalls Webhook') */
	displayName: string;

	/** Node description */
	description: string;

	/** Icon configuration */
	icon: INodeTypeDescription['icon'];

	/** Default webhook path (e.g., 'adcalls') */
	defaultPath: string;

	/** Categories for grouping in n8n UI (e.g., ['AdCalls']) */
	categories?: string[];

	/** Additional node properties beyond base ones */
	additionalProperties?: INodeProperties[];

	/** Transform raw payload to normalized output */
	transformPayload: (
		payload: TPayload,
		context: IWebhookFunctions,
	) => INodeExecutionData[] | Promise<INodeExecutionData[]>;

	/** Optional validation before transformation */
	validatePayload: (payload: unknown) => boolean;

	/** Optional custom response to send back */
	getWebhookResponse?: (payload: TPayload, context: IWebhookFunctions) => unknown;
}

/**
 * Standard call tracking event fields (shared across providers)
 */
export interface StandardCallEvent {
	id: number;
	domain: string;
	source: string;
	caller: string;
	number: string;
	destination: string;
	ext_ref_id: string;
	url: string;
	session_cid: null | string;
	google_gclid: null | string;
	google_dclid: null | string;
	bgid: null | string;
	campaignid: null | string;
	msclkid: null | string;
	fbp: null | string;
	fbc: null | string;
	visitor_id: string;
}

export interface StandardCallEventBefore extends StandardCallEvent {
	timestamp: string;
	visitor_id: string;
	secretstring: string;
}

export interface StandardCallEventAfter extends StandardCallEvent {
	started: string;
	duration: number;
	call_time: number;
	dialed_time: number;
	hangup_cause: string;
	answered: boolean;
	answered_string: string;
}

// export type StandardCallEventAfter = {
// 	started: string;
// 	duration: number;
// 	call_time: number;
// 	dialed_time: number;
// 	hangup_cause: string;
// 	answered: boolean;
// 	answered_string: string;
// };

/**
 * Helper to create n8n execution data from any payload
 */
export function createExecutionData<T extends IDataObject>(
	json: T,
	pairedItem?: { item: number },
): INodeExecutionData {
	return {
		json,
		...(pairedItem && { pairedItem }),
	};
}

/**
 * Helper to create multiple execution data items
 */
export function createExecutionDataArray<T extends IDataObject>(items: T[]): INodeExecutionData[] {
	return items.map((json, index) => createExecutionData(json, { item: index }));
}
