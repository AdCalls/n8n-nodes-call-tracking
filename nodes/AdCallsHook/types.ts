import type { StandardCallEvent } from '../../lib/webhook';
import type { INodeExecutionData } from 'n8n-workflow';
import { createExecutionData } from '../../lib/webhook';
import type { StandardCallEventBefore } from '../../lib/webhook/types';

function isNullableString(v: unknown): v is null | string {
	return v === null || typeof v === 'string';
}

export function isAdCallsPayload(payload: unknown): payload is StandardCallEventBefore {
	if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
		return false;
	}
	const p = payload as Record<string, unknown>;
	return (
		typeof p.id === 'number' &&
		typeof p.domain === 'string' &&
		typeof p.source === 'string' &&
		typeof p.caller === 'string' &&
		typeof p.number === 'string' &&
		typeof p.destination === 'string' &&
		typeof p.ext_ref_id === 'string' &&
		typeof p.url === 'string' &&
		typeof p.visitor_id === 'string' &&
		typeof p.timestamp === 'string' &&
		typeof p.secretstring === 'string' &&
		isNullableString(p.session_cid) &&
		isNullableString(p.google_gclid) &&
		isNullableString(p.google_dclid) &&
		isNullableString(p.bgid) &&
		isNullableString(p.campaignid) &&
		isNullableString(p.msclkid) &&
		isNullableString(p.fbp) &&
		isNullableString(p.fbc)
	);
}

/**
 * Transform AdCalls payload to standardized format
 */
export function transformAdCallsPayload(
	payload: StandardCallEvent,
): INodeExecutionData[] {
	const { ...validFields } = payload;
	return [createExecutionData(validFields)];
}
