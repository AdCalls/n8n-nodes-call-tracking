import type { INodeExecutionData } from 'n8n-workflow';
import type { StandardCallEvent } from '../../lib/webhook';
import { createExecutionData } from '../../lib/webhook';
import { StandardCallEventBefore } from '../../lib/webhook/types';

/**
 * Type guard to validate incoming payload
 */
export function isAdCallsPayload(payload: unknown): boolean {
	return !!(payload as StandardCallEventBefore);
}

/**
 * Transform AdCalls payload to standardized format
 */
export function transformAdCallsPayload(payload: StandardCallEvent): INodeExecutionData[] {
	const { ...validFields } = payload;
	return [createExecutionData(validFields)];
}
