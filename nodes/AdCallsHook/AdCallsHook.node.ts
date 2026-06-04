import { BaseWebhookNode, type WebhookNodeConfig } from '../../lib/webhook';
import { isAdCallsPayload, transformAdCallsPayload, type AdCallsPayload } from './types';

const config: WebhookNodeConfig<AdCallsPayload> = {
	name: 'AdCallsHook',
	displayName: 'AdCalls Hook',
	description: 'Starts the workflow when one of your AdCalls numbers is called',
	icon: 'file:../../lib/adcalls.svg',
	categories: ['AdCalls'],
	validatePayload: isAdCallsPayload,
	transformPayload: transformAdCallsPayload,
};

export class AdCallsHook extends BaseWebhookNode<AdCallsPayload> {
	constructor() {
		super(config);
	}
}
