import { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessage, sendMessageAsync } from '../../../shared/utils/chrome-messaging';
import type { TimerStateResponse } from '../../../shared/types/chrome-messages';
import type { TimerMap } from '../../../shared/types/timer';

interface UseTimerReturn {
	running: boolean;
	startedAtMs: number | null;
	elapsedMs: number;
	toggle: () => void;
}

export function useTimer(problemId: string, title: string): UseTimerReturn {
	const [running, setRunning] = useState(false);
	const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
	const [elapsedMs, setElapsedMs] = useState(0);
	const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startTicking = useCallback((start: number) => {
		if (tickRef.current) clearInterval(tickRef.current);
		const update = () => setElapsedMs(Date.now() - start);
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
			if (state?.running && state.startedAtMs) {
				setRunning(true);
				setStartedAtMs(state.startedAtMs);
				startTicking(state.startedAtMs);
			}
		});

		return () => stopTicking();
	}, [problemId, startTicking, stopTicking]);

	// Listen for storage changes
	useEffect(() => {
		const listener = (
			changes: Record<string, chrome.storage.StorageChange>,
			area: string,
		) => {
			if (area !== 'local' || !changes.bj_solve_timers) return;
			const timers = (changes.bj_solve_timers.newValue ?? {}) as TimerMap;
			const t = timers[problemId];
			if (t?.running && t.startedAtMs) {
				setRunning(true);
				setStartedAtMs(t.startedAtMs);
				startTicking(t.startedAtMs);
			} else {
				setRunning(false);
				setStartedAtMs(null);
				setElapsedMs(0);
				stopTicking();
			}
		};

		chrome.storage.onChanged.addListener(listener);
		return () => chrome.storage.onChanged.removeListener(listener);
	}, [problemId, startTicking, stopTicking]);

	const toggle = useCallback(() => {
		if (running) {
			sendMessage({
				type: 'STOP_TIMER_IF_RUNNING',
				payload: { problemId },
			});
			setRunning(false);
			setStartedAtMs(null);
			setElapsedMs(0);
			stopTicking();
		} else {
			sendMessage({
				type: 'START_TIMER',
				payload: { problemId, title },
			});
			const now = Date.now();
			setRunning(true);
			setStartedAtMs(now);
			startTicking(now);
		}
	}, [running, problemId, title, startTicking, stopTicking]);

	return { running, startedAtMs, elapsedMs, toggle };
}
