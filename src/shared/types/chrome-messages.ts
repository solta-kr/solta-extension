export type ChromeMessage =
	| { type: 'START_TIMER'; payload: { problemId: string; title: string } }
	| { type: 'STOP_TIMER_IF_RUNNING'; payload: { problemId: string } }
	| { type: 'GET_TIMER_STATE'; payload: { problemId: string } }
	| {
			type: 'SUBMIT_TO_SERVER';
			payload: {
				problemId: string;
				solveTimeSeconds: number | null;
				solveType: 'SELF' | 'SOLUTION';
			};
	  }
	| {
			type: 'SHOW_SOLVED_MODAL';
			payload: {
				problemId: string;
				title: string;
				elapsedMs: number | null;
			};
	  }
	| { type: 'FETCH_PROBLEM_META'; payload: { problemId: string } }
	| { type: 'CHECK_AUTH' }
	| { type: 'LOGIN' };

export interface TimerStateResponse {
	running: boolean;
	startedAtMs?: number;
}

export interface SubmitResponse {
	success: boolean;
	error?: string;
}

export interface CheckAuthResponse {
	loggedIn: boolean;
}

export interface LoginResponse {
	success: boolean;
	error?: string;
}
