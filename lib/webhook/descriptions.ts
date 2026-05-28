import type { INodeProperties } from 'n8n-workflow';

export const triggerProperty: INodeProperties = {
	displayName: 'Trigger',
	name: 'trigger',
	type: 'options',
	required: true,
	default: 1,
	options: [
		{ name: 'Before the call', value: 0 },
		{ name: 'After the call', value: 1 },
		{ name: 'After the call has been evaluated in the dashboard', value: 3 },
		{ name: 'After the call request', value: 4 },
		{ name: 'After the call request has been evaluated in the dashboard', value: 5 },
	],
};
