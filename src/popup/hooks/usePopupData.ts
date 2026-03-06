import { useState, useEffect } from 'react';
import type { XpSummaryResponse, ReviewListResponse } from '../../shared/types/api';
import { getPopupXp, getPopupReviews } from '../api';

export function usePopupData(username: string | undefined) {
	const [xpSummary, setXpSummary] = useState<XpSummaryResponse | undefined>();
	const [reviews, setReviews] = useState<ReviewListResponse | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!username) {
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		Promise.all([getPopupXp(username), getPopupReviews(username)])
			.then(([xp, rev]) => {
				setXpSummary(xp);
				setReviews(rev);
			})
			.catch(() => {})
			.finally(() => setIsLoading(false));
	}, [username]);

	return { xpSummary, reviews, isLoading };
}
