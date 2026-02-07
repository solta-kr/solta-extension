export interface TimerEntry {
	startedAtMs: number;
	running: boolean;
	title?: string;
}

export type TimerMap = Record<string, TimerEntry>;
