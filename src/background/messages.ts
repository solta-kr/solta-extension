import type { ChromeMessage } from '../shared/types/chrome-messages';
import { startTimer, stopTimer, getTimer, restoreTimerSync } from './timer-manager';
import { submitToServer } from './api';
import { fetchProblemMeta } from '../shared/utils/solved-ac';

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
	}

	return undefined;
}
