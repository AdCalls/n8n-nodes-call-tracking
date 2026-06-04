import type { StandardCallEvent } from '../../lib/webhook';
import type { INodeExecutionData } from 'n8n-workflow';
import { createExecutionData } from '../../lib/webhook';
import type { StandardCallEventBefore, StandardCallEventAfter } from '../../lib/webhook/types';

export type AdCallsPayload = StandardCallEventBefore | StandardCallEventAfter;

type FieldValidator = (v: unknown) => boolean;
type Schema = Record<string, FieldValidator>;

const isString = (v: unknown): v is string => typeof v === 'string';
const isNumber = (v: unknown): v is number => typeof v === 'number';
const isBoolean = (v: unknown): v is boolean => typeof v === 'boolean';
const isNullableString = (v: unknown): v is null | string => v === null || typeof v === 'string';

function matchesSchema(p: Record<string, unknown>, schema: Schema): boolean {
	return Object.entries(schema).every(([key, validate]) => validate(p[key]));
}

const COMMON_SCHEMA: Schema = {
	id: isNumber,
	domain: isString,
	source: isString,
	caller: isNumber,
	number: isString,
	destination: isNumber,
	ext_ref_id: isNullableString,
	url: isNullableString,
	session_cid: isNullableString,
	google_gclid: isNullableString,
	google_dclid: isNullableString,
	bgid: isNullableString,
	campaignid: isNullableString,
	msclkid: isNullableString,
	fbp: isNullableString,
	fbc: isNullableString,
	visitor_id: isNullableString,
};

// Each entry represents the unique fields for one payload type
const TYPE_SCHEMAS: Schema[] = [
	// StandardCallEventBefore
	{ timestamp: isString },
	// StandardCallEventAfter
	{
		started: isString,
		duration: isNumber,
		call_time: isNumber,
		dialed_time: isNumber,
		hangup_cause: isString,
		answered: isBoolean,
		answered_string: isString,
	},
];

export function isAdCallsPayload(payload: unknown): payload is AdCallsPayload {
	if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
		return false;
	}
	const p = payload as Record<string, unknown>;
	return matchesSchema(p, COMMON_SCHEMA) && TYPE_SCHEMAS.some((schema) => matchesSchema(p, schema));
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
