import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { API_BASE_URL } from '../lib/constants';

export class AdCallsWebhookApi implements ICredentialType {
	name = 'adCallsWebhookApi';
	displayName = 'AdCalls Webhook API';
	icon: Icon = 'file:../lib/adcalls.svg';
	documentationUrl = 'https://calltracking.adcalls.nl/knowledge-center/article/310';
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
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				token: '={{$credentials.token}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: API_BASE_URL,
			url: '/integration/n8n/verification',
			method: 'POST',
			body: {
				token: '={{$credentials.token}}',
			},
		},
	};
}
