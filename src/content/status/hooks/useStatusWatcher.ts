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
	if (!resultSpan) return false;
	if (resultSpan.classList.contains('result-ac')) return true;
	const text = (resultSpan.textContent ?? '').trim();
	if (text.includes('맞았습니다')) return true;
	if (text === 'Accepted') return true;
	if (/100/.test(text)) return true;
	return false;
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

export function useStatusWatcher(
	onSolved: (problemId: string, elapsedMs: number | null) => void,
) {
	const lastHandledRef = useRef<string | null>(null);
	const initialAcIdsRef = useRef<Set<string>>(new Set());
	const onSolvedRef = useRef(onSolved);
	onSolvedRef.current = onSolved;

	useEffect(() => {
		const tbody = document.querySelector(
			'table#status-table tbody, .result tbody, #status-table tbody, tbody',
		);
		if (!tbody) return;

		// 페이지 로드 시 이미 AC인 행 기록 (타이머 없이 재방문 시 오탐 방지)
		const initialRows = tbody.querySelectorAll<HTMLTableRowElement>(
			'tr[id^="solution-"]',
		);
		initialRows.forEach((tr) => {
			if (isRowAccepted(tr)) {
				initialAcIdsRef.current.add(tr.id.replace('solution-', ''));
			}
		});

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

				const isNewlyAc = !initialAcIdsRef.current.has(solutionId);

				sendMessageAsync<TimerStateResponse>({
					type: 'GET_TIMER_STATE',
					payload: { problemId: pid },
				})
					.then((state) => {
						if (state?.running && state.startedAtMs) {
							// 타이머 실행 중: 타이머 시작 이후 제출인 경우 처리
							const startedAtSec = Math.floor(
								state.startedAtMs / 1000,
							);
							const rowTs = extractRowTimestampSec(tr);
							if (rowTs && rowTs >= startedAtSec) {
								lastHandledRef.current = solutionId;
								const elapsedMs =
									Date.now() - state.startedAtMs;
								sendMessage({
									type: 'STOP_TIMER_IF_RUNNING',
									payload: { problemId: pid },
								});
								onSolvedRef.current(pid, elapsedMs);
							}
						} else if (isNewlyAc) {
							// 타이머 미사용: 채점 중 → AC로 새로 전환된 경우만 처리
							lastHandledRef.current = solutionId;
							onSolvedRef.current(pid, null);
						}
					})
					.catch(() => {});

				break;
			}
		};

		handle();
		const observer = new MutationObserver(handle);
		observer.observe(tbody, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, []);
}
