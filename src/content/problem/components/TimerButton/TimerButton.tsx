import * as S from './TimerButton.styled';

interface Props {
	running: boolean;
	onClick: () => void;
}

export default function TimerButton({ running, onClick }: Props) {
	return (
		<S.Button $running={running} onClick={onClick}>
			{running ? '시간 측정 중지' : '시간 측정 시작'}
		</S.Button>
	);
}
