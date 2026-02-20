import { fetchWithAuth } from '../shared/utils/fetch-with-auth';

export async function submitToServer(
	problemId: string,
	solveTimeSeconds: number | null,
	solveType: 'SELF' | 'SOLUTION',
	memo?: string | null,
): Promise<boolean> {
	const response = await fetchWithAuth('/api/solveds', {
		method: 'POST',
		body: JSON.stringify({
			solveType: solveType || 'SELF',
			bojProblemId: parseInt(problemId),
			solveTimeSeconds,
			memo: memo?.trim() || null,
		}),
	});

	if (response.ok) {
		return true;
	}

	const errorData = (await response.json()) as { message?: string };
	throw new Error(errorData.message ?? `HTTP ${response.status}`);
}
