import { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessage, sendMessageAsync } from '../../../shared/utils/chrome-messaging';
import type { TimerStateResponse } from '../../../shared/types/chrome-messages';
import type { TimerMap } from '../../../shared/types/timer';

interface UseTimerReturn {
	running: boolean;
	paused: boolean;
	elapsedMs: number;
	start: () => void;
	pause: () => void;
	resume: () => void;
	reset: () => void;
}

export function useTimer(problemId: string, title: string): UseTimerReturn {
	const [running, setRunning] = useState(false);
	const [paused, setPaused] = useState(false);
	const [elapsedMs, setElapsedMs] = useState(0);
	// accumulatedMs at the moment ticking started (for the current segment)
	const accumulatedRef = useRef(0);
	const segmentStartRef = useRef(0);
	const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startTicking = useCallback((segmentStartMs: number, accMs: number) => {
		if (tickRef.current) clearInterval(tickRef.current);
		accumulatedRef.current = accMs;
		segmentStartRef.current = segmentStartMs;
		const update = () =>
			setElapsedMs(accumulatedRef.current + (Date.now() - segmentStartRef.current));
		update();
		tickRef.current = setInterval(update, 1000);
	}, []);

	const stopTicking = useCallback(() => {
		if (tickRef.current) {
			clearInterval(tickRef.current);
			tickRef.current = null;
		}
	}, []);

	// Fetch initial state
	useEffect(() => {
		sendMessageAsync<TimerStateResponse>({
			type: 'GET_TIMER_STATE',
			payload: { problemId },
		}).then((state) => {
			if (!state) return;
			if (state.running && state.startedAtMs) {
				setRunning(true);
				setPaused(false);
				setElapsedMs(state.accumulatedMs + (Date.now() - state.startedAtMs));
				startTicking(state.startedAtMs, state.accumulatedMs);
			} else if (state.paused) {
				setRunning(false);
				setPaused(true);
				setElapsedMs(state.accumulatedMs);
				accumulatedRef.current = state.accumulatedMs;
			}
		});

		return () => stopTicking();
	}, [problemId, startTicking, stopTicking]);

	// Listen for storage changes (cross-tab sync)
	useEffect(() => {
		const listener = (
			changes: Record<string, chrome.storage.StorageChange>,
			area: string,
		) => {
			if (area !== 'local' || !changes.bj_solve_timers) return;
			const timers = (changes.bj_solve_timers.newValue ?? {}) as TimerMap;
			const t = timers[problemId];
			if (!t) {
				// Timer was reset or deleted
				setRunning(false);
				setPaused(false);
				setElapsedMs(0);
				accumulatedRef.current = 0;
				stopTicking();
			} else if (t.running && t.startedAtMs) {
				setRunning(true);
				setPaused(false);
				startTicking(t.startedAtMs, t.accumulatedMs);
			} else if (t.paused) {
				setRunning(false);
				setPaused(true);
				setElapsedMs(t.accumulatedMs);
				accumulatedRef.current = t.accumulatedMs;
				stopTicking();
			} else {
				setRunning(false);
				setPaused(false);
				setElapsedMs(0);
				accumulatedRef.current = 0;
				stopTicking();
			}
		};

		chrome.storage.onChanged.addListener(listener);
		return () => chrome.storage.onChanged.removeListener(listener);
	}, [problemId, startTicking, stopTicking]);

	const start = useCallback(() => {
		sendMessage({ type: 'START_TIMER', payload: { problemId, title } });
		const now = Date.now();
		setRunning(true);
		setPaused(false);
		setElapsedMs(0);
		startTicking(now, 0);
	}, [problemId, title, startTicking]);

	const pause = useCallback(() => {
		sendMessage({ type: 'PAUSE_TIMER', payload: { problemId } });
		const accumulated = accumulatedRef.current + (Date.now() - segmentStartRef.current);
		setRunning(false);
		setPaused(true);
		setElapsedMs(accumulated);
		accumulatedRef.current = accumulated;
		stopTicking();
	}, [problemId, stopTicking]);

	const resume = useCallback(() => {
		sendMessage({ type: 'RESUME_TIMER', payload: { problemId } });
		const now = Date.now();
		setRunning(true);
		setPaused(false);
		startTicking(now, accumulatedRef.current);
	}, [problemId, startTicking]);

	const reset = useCallback(() => {
		sendMessage({ type: 'RESET_TIMER', payload: { problemId } });
		setRunning(false);
		setPaused(false);
		setElapsedMs(0);
		accumulatedRef.current = 0;
		stopTicking();
	}, [problemId, stopTicking]);

	return { running, paused, elapsedMs, start, pause, resume, reset };
}
