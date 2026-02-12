import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class AdCallsWebhookApi implements ICredentialType {
	name = 'adCallsWebhookApi';
	displayName = 'AdCalls Webhook Secret';
	icon: Icon = 'file:../lib/adcalls.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Secret token used to verify webhook signatures',
		},
	];
}
