import { useState, useCallback } from 'react';
import type { SolvedAcProblemMeta } from '../../shared/types/solved-ac';
import { sendMessageAsync } from '../../shared/utils/chrome-messaging';
import { useStatusWatcher } from './hooks/useStatusWatcher';
import SolvedModal from './components/SolvedModal/SolvedModal';

interface ModalData {
	problemId: string;
	title: string;
	elapsedMs: number | null;
	meta: SolvedAcProblemMeta | null;
}

interface FetchMetaResponse {
	meta: SolvedAcProblemMeta | null;
}

export default function App() {
	const [modalData, setModalData] = useState<ModalData | null>(null);

	const handleSolved = useCallback(
		(problemId: string, elapsedMs: number | null) => {
			sendMessageAsync<FetchMetaResponse>({
				type: 'FETCH_PROBLEM_META',
				payload: { problemId },
			})
				.then((res) => {
					const meta = res?.meta ?? null;
					setModalData({
						problemId,
						title: meta?.titleKo ?? '문제',
						elapsedMs,
						meta,
					});
				})
				.catch(() => {
					setModalData({
						problemId,
						title: '문제',
						elapsedMs,
						meta: null,
					});
				});
		},
		[],
	);

	useStatusWatcher(handleSolved);

	if (!modalData) return null;

	return (
		<SolvedModal
			problemId={modalData.problemId}
			title={modalData.title}
			elapsedMs={modalData.elapsedMs}
			meta={modalData.meta}
			onClose={() => setModalData(null)}
		/>
	);
}
