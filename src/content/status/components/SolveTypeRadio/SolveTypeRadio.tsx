import * as S from './SolveTypeRadio.styled';

interface Props {
	value: 'SELF' | 'SOLUTION';
	onChange: (value: 'SELF' | 'SOLUTION') => void;
}

export default function SolveTypeRadio({ value, onChange }: Props) {
	return (
		<S.Group role="radiogroup" aria-label="풀이 방식">
			<S.Option
				$active={value === 'SELF'}
				onClick={() => onChange('SELF')}
				type="button"
			>
				스스로 풀이
			</S.Option>
			<S.Option
				$active={value === 'SOLUTION'}
				onClick={() => onChange('SOLUTION')}
				type="button"
			>
				답지 참고
			</S.Option>
		</S.Group>
	);
}
