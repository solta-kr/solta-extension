import type { TimerEntry, TimerMap } from '../shared/types/timer';

const timers: TimerMap = {};

export function getTimer(problemId: string): TimerEntry | undefined {
	return timers[problemId];
}

export function startTimer(problemId: string, title: string): void {
	timers[problemId] = {
		startedAtMs: Date.now(),
		running: true,
		title,
	};
	persistTimers();
}

export function stopTimer(problemId: string): TimerEntry | undefined {
	const timer = timers[problemId];
	if (timer?.running) {
		timer.running = false;
		persistTimers();
		return timer;
	}
	return undefined;
}

export async function restoreTimers(): Promise<void> {
	const data = await chrome.storage.local.get(['bj_solve_timers']);
	const saved = (data.bj_solve_timers as TimerMap) ?? {};
	Object.assign(timers, saved);
}

export async function restoreTimerSync(
	problemId: string,
): Promise<TimerEntry | undefined> {
	if (timers[problemId]) return timers[problemId];
	const data = await chrome.storage.local.get(['bj_solve_timers']);
	const saved = (data.bj_solve_timers as TimerMap) ?? {};
	Object.assign(timers, saved);
	return timers[problemId];
}

function persistTimers(): void {
	chrome.storage.local.set({ bj_solve_timers: timers });
}
