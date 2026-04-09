import type { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

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
			description: 'Authorization Token',
		},
	];
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.adcalls.nl',
			url: '/integration/n8n/verification',
			method: 'POST',
			body: {
				token: '={{$credentials.token}}',
			},
		},
	};
}
