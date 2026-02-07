import { useState, useEffect } from 'react';
import type { ChromeMessage } from '../../shared/types/chrome-messages';
import type { SolvedAcProblemMeta } from '../../shared/types/solved-ac';
import { fetchProblemMeta } from '../../shared/utils/solved-ac';
import { useStatusWatcher } from './hooks/useStatusWatcher';
import SolvedModal from './components/SolvedModal/SolvedModal';

interface ModalData {
	problemId: string;
	title: string;
	elapsedMs: number;
	meta: SolvedAcProblemMeta | null;
}

export default function App() {
	const [modalData, setModalData] = useState<ModalData | null>(null);

	useStatusWatcher();

	useEffect(() => {
		const listener = (message: ChromeMessage) => {
			if (message.type === 'SHOW_SOLVED_MODAL') {
				const { problemId, title, elapsedMs } = message.payload;

				fetchProblemMeta(problemId)
					.then((meta) => {
						setModalData({ problemId, title, elapsedMs, meta });
					})
					.catch(() => {
						setModalData({
							problemId,
							title,
							elapsedMs,
							meta: null,
						});
					});
			}
		};

		chrome.runtime.onMessage.addListener(listener);
		return () => chrome.runtime.onMessage.removeListener(listener);
	}, []);

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
