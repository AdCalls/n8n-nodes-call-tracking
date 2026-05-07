/** HTTP headers type (equivalent to IncomingHttpHeaders from 'http' module) */
export type WebhookHeaders = Record<string, string | string[] | undefined>;

export function verifyWebhookSecret(headers: WebhookHeaders, secret: string): boolean {
	if (!secret) return false;

	const authHeader = headers['authorization'];
	if (!authHeader || typeof authHeader !== 'string') {
		return false;
	}

	return authHeader === secret;
}
