import * as S from './UsageGuide.styled';

const STEPS = [
	{ color: '#5B9FED', text: '백준 문제 페이지에서 "시간 측정 시작" 클릭' },
	{ color: '#4CAF50', text: '문제를 풀고 제출' },
	{ color: '#FFA726', text: '맞았을 때 나타나는 모달에서 "저장하기" 클릭' },
	{ color: '#AB47BC', text: '풀이 기록이 Solta에 자동 저장' },
] as const;

export default function UsageGuide() {
	return (
		<S.Container>
			<S.Title>사용법</S.Title>
			<S.Steps>
				{STEPS.map((step, i) => (
					<S.Step key={i}>
						<S.StepNumber $color={step.color}>
							{i + 1}
						</S.StepNumber>
						<S.StepText>{step.text}</S.StepText>
					</S.Step>
				))}
			</S.Steps>
		</S.Container>
	);
}
