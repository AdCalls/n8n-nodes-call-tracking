import type { IDataObject, INodeExecutionData } from 'n8n-workflow';
import { createExecutionData } from '../../lib/webhook';
import { StandardCallEventAfter } from '../../lib/webhook/types';

/**
 * Type guard to validate incoming payload
 */
export function isAdCallsPayload(payload: unknown): boolean {
	return !!(payload as StandardCallEventAfter);
}

/**
 * Transform AdCalls payload to standardized format
 */
export function transformAdCallsPayload(payload: StandardCallEventAfter): INodeExecutionData[] {
	return [createExecutionData(payload as unknown as IDataObject)];
}
