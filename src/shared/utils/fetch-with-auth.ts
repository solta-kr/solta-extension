import { SERVER_URL } from '../constants/config';

export async function fetchWithAuth(
	urlOrPath: string,
	options: RequestInit = {},
): Promise<Response> {
	const { accessToken } = await chrome.storage.local.get(['accessToken']);

	const fullUrl = urlOrPath.startsWith('/')
		? `${SERVER_URL}${urlOrPath}`
		: urlOrPath;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(accessToken ? { Authorization: `Bearer ${accessToken as string}` } : {}),
		...options.headers,
	};

	return fetch(fullUrl, { ...options, headers });
}
