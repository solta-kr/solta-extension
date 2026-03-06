import { fetchWithAuth } from '../shared/utils/fetch-with-auth';
import type { XpSummaryResponse, ReviewListResponse } from '../shared/types/api';

export async function getPopupXp(username: string): Promise<XpSummaryResponse> {
	const res = await fetchWithAuth(`/api/members/${encodeURIComponent(username)}/xp`);
	if (!res.ok) throw new Error('XP fetch failed');
	return res.json() as Promise<XpSummaryResponse>;
}

export async function getPopupReviews(username: string): Promise<ReviewListResponse> {
	const res = await fetchWithAuth(`/api/reviews?name=${encodeURIComponent(username)}`);
	if (!res.ok) throw new Error('Reviews fetch failed');
	return res.json() as Promise<ReviewListResponse>;
}
