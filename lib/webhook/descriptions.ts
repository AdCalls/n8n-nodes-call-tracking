import type { INodeProperties } from 'n8n-workflow';

export function webhookPathProperty(defaultPath: string): INodeProperties {
	return {
		displayName: 'Webhook Path',
		name: 'path',
		type: 'string',
		default: defaultPath,
		placeholder: 'webhook-path',
		required: true,
		description: 'The path to listen on for this webhook',
	};
}

export const secretProperty: INodeProperties = {
	displayName: 'Webhook Secret',
	name: 'webhookSecret',
	type: 'string',
	typeOptions: {
		password: true,
	},
	default: '',
	description: 'Secret key used to verify webhook signatures',
};
