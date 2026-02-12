import { BaseWebhookNode, type WebhookNodeConfig } from '../../lib/webhook';
import { isAdCallsPayload, transformAdCallsPayload } from './types';
import { StandardCallEventAfter } from '../../lib/webhook/types';

const config: WebhookNodeConfig<StandardCallEventAfter> = {
	name: 'AdCallsHookAfterCall',
	displayName: 'AdCalls After Call',
	description: 'Starts the workflow after a called finished on one of your AdCalls numbers.',
	icon: 'file:../../lib/adcalls.svg',
	defaultPath: '',
	categories: ['AdCalls'],

	validatePayload: isAdCallsPayload,
	transformPayload: transformAdCallsPayload,

	additionalProperties: [],
};

export class AdCallsHookAfterCall extends BaseWebhookNode<StandardCallEventAfter> {
	constructor() {
		super(config);
	}
}
