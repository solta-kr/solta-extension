import { useState, useCallback } from 'react';
import type { SolvedAcProblemMeta } from '../../shared/types/solved-ac';
import { fetchProblemMeta } from '../../shared/utils/solved-ac';
import { useStatusWatcher } from './hooks/useStatusWatcher';
import SolvedModal from './components/SolvedModal/SolvedModal';

interface ModalData {
	problemId: string;
	title: string;
	elapsedMs: number | null;
	meta: SolvedAcProblemMeta | null;
}

export default function App() {
	const [modalData, setModalData] = useState<ModalData | null>(null);

	const handleSolved = useCallback(
		(problemId: string, elapsedMs: number | null) => {
			fetchProblemMeta(problemId)
				.then((meta) => {
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
