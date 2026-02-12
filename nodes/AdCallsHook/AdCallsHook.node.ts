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

	additionalProperties: [
		// {
		// 	displayName: 'Event Types',
		// 	name: 'eventTypes',
		// 	type: 'multiOptions',
		// 	options: [
		// 		{ name: 'Call Started', value: 'call_started' },
		// 		{ name: 'Call Ended', value: 'call_ended' },
		// 		{ name: 'Call Missed', value: 'call_missed' },
		// 	],
		// 	default: ['call_started', 'call_ended', 'call_missed'],
		// 	description: 'Filter which event types trigger the workflow',
		// },
	],
};

export class AdCallsHook extends BaseWebhookNode<StandardCallEventBefore> {
	constructor() {
		super(config);
	}
}
