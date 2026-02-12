/** HTTP headers type (equivalent to IncomingHttpHeaders from 'http' module) */
export type WebhookHeaders = Record<string, string | string[] | undefined>;

const SECRET_HEADER = 'x-ac-webhook-secret';

export function verifyWebhookSecret(headers: WebhookHeaders, secret: string): boolean {
	if (!secret) return false;

	const headerValue = headers[SECRET_HEADER];
	if (!headerValue || typeof headerValue !== 'string') {
		return false;
	}

	return headerValue === secret;
}
