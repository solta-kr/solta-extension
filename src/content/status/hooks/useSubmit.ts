import { useState, useCallback } from 'react';
import { sendMessageAsync } from '../../../shared/utils/chrome-messaging';
import type { SubmitResponse } from '../../../shared/types/chrome-messages';

export function useSubmit() {
	const [submitting, setSubmitting] = useState(false);

	const submit = useCallback(
		async (
			problemId: string,
			solveTimeSeconds: number | null,
			solveType: 'SELF' | 'SOLUTION',
		): Promise<boolean> => {
			setSubmitting(true);
			try {
				const response = await sendMessageAsync<SubmitResponse>({
					type: 'SUBMIT_TO_SERVER',
					payload: { problemId, solveTimeSeconds, solveType },
				});
				return response.success;
			} catch {
				return false;
			} finally {
				setSubmitting(false);
			}
		},
		[],
	);

	return { submitting, submit };
}
