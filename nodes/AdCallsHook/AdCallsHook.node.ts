import { BaseWebhookNode, type WebhookNodeConfig } from '../../lib/webhook';
import { isAdCallsPayload, transformAdCallsPayload } from './types';
import { StandardCallEventBefore } from '../../lib/webhook/types';

const config: WebhookNodeConfig<StandardCallEventBefore> = {
	name: 'AdCallsHook',
	displayName: 'AdCalls Hook',
	description: 'Starts the workflow when one of your AdCalls numbers is called',
	icon: 'file:../../lib/adcalls.svg',
	defaultPath: '',
	categories: ['AdCalls'],
	validatePayload: isAdCallsPayload,
	transformPayload: transformAdCallsPayload,
};

export class AdCallsHook extends BaseWebhookNode<StandardCallEventBefore> {
	constructor() {
		super(config);
	}
}
