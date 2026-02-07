import { useEffect, useRef } from 'react';
import { sendMessage, sendMessageAsync } from '../../../shared/utils/chrome-messaging';
import type { TimerStateResponse } from '../../../shared/types/chrome-messages';

function getProblemIdFromQuery(): string | null {
	const url = new URL(location.href);
	return url.searchParams.get('problem_id');
}

function getUserIdFromQuery(): string | null {
	const url = new URL(location.href);
	return url.searchParams.get('user_id');
}

function isRowAccepted(tr: HTMLTableRowElement): boolean {
	const resultSpan = tr.querySelector('.result-text');
	return !!resultSpan?.classList.contains('result-ac');
}

function extractRowProblemId(tr: HTMLTableRowElement): string | null {
	const a = tr.querySelector<HTMLAnchorElement>('a.problem_title');
	if (!a) return null;
	const text = a.textContent?.trim() ?? '';
	if (/^\d+$/.test(text)) return text;
	const match = (a.getAttribute('href') ?? '').match(/\/problem\/(\d+)/);
	return match?.[1] ?? null;
}

function extractRowUserId(tr: HTMLTableRowElement): string | null {
	const a = tr.querySelector<HTMLAnchorElement>(
		'td:nth-child(2) a[href^="/user/"]',
	);
	if (!a) return null;
	const m = (a.getAttribute('href') ?? '').match(/\/user\/(.+)$/);
	return m?.[1] ?? null;
}

function extractRowTimestampSec(tr: HTMLTableRowElement): number | null {
	const a = tr.querySelector<HTMLAnchorElement>(
		'a.real-time-update[data-timestamp]',
	);
	if (!a) return null;
	const n = Number(a.getAttribute('data-timestamp'));
	return Number.isFinite(n) ? n : null;
}

export function useStatusWatcher() {
	const lastHandledRef = useRef<string | null>(null);

	useEffect(() => {
		const tbody = document.querySelector(
			'table#status-table tbody, .result tbody, #status-table tbody, tbody',
		);
		if (!tbody) return;

		const handle = () => {
			const rows = Array.from(
				tbody.querySelectorAll<HTMLTableRowElement>(
					'tr[id^="solution-"]',
				),
			);
			if (rows.length === 0) return;

			const myUser = getUserIdFromQuery();
			const problemInQuery = getProblemIdFromQuery();

			for (const tr of rows) {
				const solutionId = tr.id.replace('solution-', '');
				if (
					lastHandledRef.current &&
					solutionId <= lastHandledRef.current
				)
					continue;
				if (!isRowAccepted(tr)) continue;

				const rowUser = extractRowUserId(tr);
				if (myUser && rowUser && myUser !== rowUser) continue;

				const rowPid = extractRowProblemId(tr);
				if (problemInQuery && rowPid && problemInQuery !== rowPid)
					continue;

				const pid = problemInQuery ?? rowPid;
				if (!pid) continue;

				sendMessageAsync<TimerStateResponse>({
					type: 'GET_TIMER_STATE',
					payload: { problemId: pid },
				}).then((state) => {
					if (!state?.running || !state.startedAtMs) return;
					const startedAtSec = Math.floor(state.startedAtMs / 1000);
					const rowTs = extractRowTimestampSec(tr);
					if (rowTs && rowTs >= startedAtSec) {
						lastHandledRef.current = solutionId;
						sendMessage({
							type: 'STOP_TIMER_IF_RUNNING',
							payload: { problemId: pid },
						});
					}
				});

				break;
			}
		};

		handle();
		const observer = new MutationObserver(handle);
		observer.observe(tbody, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, []);
}
