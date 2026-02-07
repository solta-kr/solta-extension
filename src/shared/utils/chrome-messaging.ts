import type {
	ChromeMessage,
	TimerStateResponse,
	SubmitResponse,
} from '../types/chrome-messages';

export function sendMessage(message: ChromeMessage): void {
	chrome.runtime.sendMessage(message);
}

export function sendMessageAsync<T = TimerStateResponse | SubmitResponse>(
	message: ChromeMessage,
): Promise<T> {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(message, (response: T) => {
			if (chrome.runtime.lastError) {
				reject(new Error(chrome.runtime.lastError.message));
			} else {
				resolve(response);
			}
		});
	});
}
