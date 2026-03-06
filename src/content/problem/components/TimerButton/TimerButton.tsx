import * as S from './TimerButton.styled';

interface Props {
	running: boolean;
	paused: boolean;
	elapsedMs: number;
	onStart: () => void;
	onPause: () => void;
	onResume: () => void;
	onReset: () => void;
}

export default function TimerButton({
	running,
	paused,
	elapsedMs,
	onStart,
	onPause,
	onResume,
	onReset,
}: Props) {
	const handleReset = () => {
		if (elapsedMs >= 60_000) {
			if (!window.confirm('1분 이상 측정한 기록이 초기화됩니다. 계속할까요?')) return;
		}
		onReset();
	};

	if (!running && !paused) {
		return (
			<S.Button $variant="start" onClick={onStart}>
				▶ 시작
			</S.Button>
		);
	}

	return (
		<>
			{running ? (
				<S.Button $variant="pause" onClick={onPause}>
					⏸ 일시정지
				</S.Button>
			) : (
				<S.Button $variant="resume" onClick={onResume}>
					▶ 재개
				</S.Button>
			)}
			<S.Button $variant="reset" onClick={handleReset}>
				■
			</S.Button>
		</>
	);
}
