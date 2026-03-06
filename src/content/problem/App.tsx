import styled from 'styled-components';
import { useTimer } from './hooks/useTimer';
import TimerButton from './components/TimerButton/TimerButton';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';

const Container = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 8px;
`;

interface Props {
	problemId: string;
	title: string;
}

export default function App({ problemId, title }: Props) {
	const { running, paused, elapsedMs, start, pause, resume, reset } = useTimer(problemId, title);

	return (
		<Container>
			<TimerButton
				running={running}
				paused={paused}
				elapsedMs={elapsedMs}
				onStart={start}
				onPause={pause}
				onResume={resume}
				onReset={reset}
			/>
			<TimerDisplay running={running} paused={paused} elapsedMs={elapsedMs} />
		</Container>
	);
}
