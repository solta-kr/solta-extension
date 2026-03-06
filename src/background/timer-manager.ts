import type { TimerEntry, TimerMap } from '../shared/types/timer';

const timers: TimerMap = {};

/** Fill in fields that may be missing from entries saved before the pause feature. */
function migrateLegacyEntry(entry: TimerEntry): TimerEntry {
	return {
		...entry,
		paused: entry.paused ?? false,
		accumulatedMs: entry.accumulatedMs ?? 0,
	};
}

export function getElapsedMs(entry: TimerEntry): number {
	if (entry.running) {
		return entry.accumulatedMs + (Date.now() - entry.startedAtMs);
	}
	return entry.accumulatedMs;
}

export function getTimer(problemId: string): TimerEntry | undefined {
	return timers[problemId];
}

export function startTimer(problemId: string, title: string): void {
	timers[problemId] = {
		startedAtMs: Date.now(),
		running: true,
		paused: false,
		accumulatedMs: 0,
		title,
	};
	persistTimers();
}

export function pauseTimer(problemId: string): void {
	const entry = timers[problemId];
	if (!entry?.running) return;

	const elapsed = Date.now() - entry.startedAtMs;
	timers[problemId] = {
		...entry,
		running: false,
		paused: true,
		accumulatedMs: entry.accumulatedMs + elapsed,
	};
	persistTimers();
}

export function resumeTimer(problemId: string): void {
	const entry = timers[problemId];
	if (!entry || entry.running || !entry.paused) return;

	timers[problemId] = {
		...entry,
		running: true,
		paused: false,
		startedAtMs: Date.now(),
	};
	persistTimers();
}

export function resetTimer(problemId: string): void {
	delete timers[problemId];
	persistTimers();
}

export interface StopResult {
	elapsedMs: number;
}

export function stopTimerIfRunning(problemId: string): StopResult | null {
	const entry = timers[problemId];
	if (!entry) return null;
	if (!entry.running && !entry.paused) return null;

	const totalElapsedMs = entry.running
		? entry.accumulatedMs + (Date.now() - entry.startedAtMs)
		: entry.accumulatedMs;

	delete timers[problemId];
	persistTimers();
	return { elapsedMs: totalElapsedMs };
}

// Legacy alias kept for existing callers
export function stopTimer(problemId: string): TimerEntry | undefined {
	const entry = timers[problemId];
	if (entry?.running) {
		entry.running = false;
		persistTimers();
		return entry;
	}
	return undefined;
}

export async function restoreTimers(): Promise<void> {
	const data = await chrome.storage.local.get(['bj_solve_timers']);
	const saved = (data.bj_solve_timers as TimerMap) ?? {};
	// Migrate legacy entries missing paused/accumulatedMs
	for (const [id, entry] of Object.entries(saved)) {
		timers[id] = migrateLegacyEntry(entry);
	}
}

export async function restoreTimerSync(
	problemId: string,
): Promise<TimerEntry | undefined> {
	if (timers[problemId]) return timers[problemId];
	const data = await chrome.storage.local.get(['bj_solve_timers']);
	const saved = (data.bj_solve_timers as TimerMap) ?? {};
	for (const [id, entry] of Object.entries(saved)) {
		timers[id] = migrateLegacyEntry(entry);
	}
	return timers[problemId];
}

function persistTimers(): void {
	chrome.storage.local.set({ bj_solve_timers: timers });
}
