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
	const { running, elapsedMs, toggle } = useTimer(problemId, title);

	return (
		<Container>
			<TimerButton running={running} onClick={toggle} />
			<TimerDisplay running={running} elapsedMs={elapsedMs} />
		</Container>
	);
}
