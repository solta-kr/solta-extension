import { formatElapsed } from '../../../../shared/utils/format-time';
import * as S from './TimerDisplay.styled';

interface Props {
	running: boolean;
	paused: boolean;
	elapsedMs: number;
}

export default function TimerDisplay({ running, paused, elapsedMs }: Props) {
	if (!running && !paused && elapsedMs === 0) return null;
	return (
		<S.Display $running={running} $paused={paused}>
			{formatElapsed(elapsedMs)}
		</S.Display>
	);
}
