import type { ChromeMessage } from '../shared/types/chrome-messages';
import { startTimer, stopTimer, getTimer, restoreTimerSync } from './timer-manager';
import { submitToServer } from './api';
import { fetchProblemMeta } from '../shared/utils/solved-ac';
import { fetchWithAuth } from '../shared/utils/fetch-with-auth';

export function handleMessage(
	message: ChromeMessage,
	_sender: chrome.runtime.MessageSender,
	sendResponse: (response: unknown) => void,
): boolean | undefined {
	if (!message?.type) return;

	switch (message.type) {
		case 'START_TIMER': {
			const { problemId, title } = message.payload;
			if (!problemId) return;
			startTimer(problemId, title);
			break;
		}

		case 'STOP_TIMER_IF_RUNNING': {
			const { problemId } = message.payload;
			if (!problemId) return;
			stopTimer(problemId);
			break;
		}

		case 'GET_TIMER_STATE': {
			const { problemId } = message.payload;
			if (!problemId) {
				sendResponse({ running: false });
				break;
			}
			const existing = getTimer(problemId);
			if (existing) {
				sendResponse({
					running: existing.running,
					startedAtMs: existing.startedAtMs,
				});
				break;
			}
			restoreTimerSync(problemId).then((timer) => {
				if (timer) {
					sendResponse({
						running: timer.running,
						startedAtMs: timer.startedAtMs,
					});
				} else {
					sendResponse({ running: false });
				}
			});
			return true; // async sendResponse
		}

		case 'SUBMIT_TO_SERVER': {
			const { problemId, solveTimeSeconds, solveType } = message.payload;
			submitToServer(problemId, solveTimeSeconds, solveType)
				.then((success) => sendResponse({ success }))
				.catch((error: Error) =>
					sendResponse({ success: false, error: error.message }),
				);
			return true; // async sendResponse
		}

		case 'FETCH_PROBLEM_META': {
			const { problemId } = message.payload;
			fetchProblemMeta(problemId)
				.then((meta) => sendResponse({ meta }))
				.catch(() => sendResponse({ meta: null }));
			return true; // async sendResponse
		}

		case 'CHECK_AUTH': {
			fetchWithAuth('/api/members/me')
				.then((res) => sendResponse({ loggedIn: res.ok }))
				.catch(() => sendResponse({ loggedIn: false }));
			return true; // async sendResponse
		}

		case 'LOGIN': {
			handleLogin(sendResponse);
			return true; // async sendResponse
		}
	}

	return undefined;
}

async function handleLogin(sendResponse: (response: unknown) => void) {
	try {
		const res = await fetchWithAuth(
			'/api/auth/oauth/github/login?client=EXTENSION',
		);
		if (!res.ok) {
			sendResponse({ success: false, error: 'OAuth URL 요청 실패' });
			return;
		}
		const { url: authUrl } = (await res.json()) as { url: string };

		chrome.identity.launchWebAuthFlow(
			{ url: authUrl, interactive: true },
			async (redirectUrl) => {
				if (chrome.runtime.lastError || !redirectUrl) {
					sendResponse({ success: false, error: '로그인이 취소되었습니다.' });
					return;
				}
				try {
					const token = new URL(redirectUrl).searchParams.get('token');
					if (!token) {
						sendResponse({ success: false, error: '토큰을 찾을 수 없습니다.' });
						return;
					}
					await chrome.storage.local.set({ accessToken: token });

					const userRes = await fetchWithAuth('/api/members/me', {
						headers: { Authorization: `Bearer ${token}` },
					});
					if (userRes.ok) {
						const userInfo = await userRes.json();
						await chrome.storage.local.set({ userInfo });
					}

					sendResponse({ success: true });
				} catch {
					sendResponse({ success: false, error: '로그인 처리에 실패했습니다.' });
				}
			},
		);
	} catch {
		sendResponse({ success: false, error: '서버에 연결할 수 없습니다.' });
	}
}
