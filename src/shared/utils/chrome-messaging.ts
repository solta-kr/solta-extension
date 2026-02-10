import type {
	ChromeMessage,
	TimerStateResponse,
	SubmitResponse,
} from '../types/chrome-messages';

export function sendMessage(message: ChromeMessage): void {
	try {
		chrome.runtime.sendMessage(message);
	} catch {
		// Extension context invalidated (리로드 후 이전 페이지)
	}
}

export function sendMessageAsync<T = TimerStateResponse | SubmitResponse>(
	message: ChromeMessage,
): Promise<T> {
	return new Promise((resolve, reject) => {
		try {
			chrome.runtime.sendMessage(message, (response: T) => {
				if (chrome.runtime.lastError) {
					reject(new Error(chrome.runtime.lastError.message));
				} else {
					resolve(response);
				}
			});
		} catch {
			reject(new Error('Extension context invalidated'));
		}
	});
}
