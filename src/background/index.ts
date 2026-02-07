import { restoreTimers } from './timer-manager';
import { handleMessage } from './messages';
import type { ChromeMessage } from '../shared/types/chrome-messages';

// Restore timers on service worker startup
restoreTimers();

// Message handler
chrome.runtime.onMessage.addListener(
	(message: ChromeMessage, sender, sendResponse) =>
		handleMessage(message, sender, sendResponse),
);

// Restore on startup & install
chrome.runtime.onStartup.addListener(() => {
	restoreTimers();
});

chrome.runtime.onInstalled.addListener(() => {
	restoreTimers();
});
