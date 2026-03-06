export interface TimerEntry {
	startedAtMs: number;
	running: boolean;
	paused: boolean;
	accumulatedMs: number;
	title?: string;
}

export type TimerMap = Record<string, TimerEntry>;
