import { formatElapsed } from '../../../../shared/utils/format-time';
import * as S from './TimerDisplay.styled';

interface Props {
	running: boolean;
	elapsedMs: number;
}

export default function TimerDisplay({ running, elapsedMs }: Props) {
	if (!running && elapsedMs === 0) return null;
	return (
		<S.Display $running={running}>{formatElapsed(elapsedMs)}</S.Display>
	);
}
