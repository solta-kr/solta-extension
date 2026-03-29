import { useState, useCallback, useRef } from 'react';
import { sendMessageAsync } from '../../../shared/utils/chrome-messaging';
import type { SubmitResponse } from '../../../shared/types/chrome-messages';

export function useSubmit() {
	const [submitting, setSubmitting] = useState(false);
	const submittingRef = useRef(false);

	const submit = useCallback(
		async (
			problemId: string,
			solveTimeSeconds: number | null,
			solveType: 'SELF' | 'SOLUTION',
			memo?: string | null,
		): Promise<{ success: boolean; error?: string }> => {
			if (submittingRef.current) return { success: false };
			submittingRef.current = true;
			setSubmitting(true);
			try {
				const response = await sendMessageAsync<SubmitResponse>({
					type: 'SUBMIT_TO_SERVER',
					payload: { problemId, solveTimeSeconds, solveType, memo },
				});
				return { success: response.success, error: response.error };
			} catch (e) {
				const msg = e instanceof Error ? e.message : undefined;
				return { success: false, error: msg };
			} finally {
				submittingRef.current = false;
				setSubmitting(false);
			}
		},
		[],
	);

	return { submitting, submit };
}
