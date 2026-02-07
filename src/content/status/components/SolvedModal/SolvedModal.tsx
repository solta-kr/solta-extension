import { useState } from 'react';
import { formatElapsedKorean } from '../../../../shared/utils/format-time';
import type { SolvedAcProblemMeta } from '../../../../shared/types/solved-ac';
import SolveTypeRadio from '../SolveTypeRadio/SolveTypeRadio';
import { useSubmit } from '../../hooks/useSubmit';
import * as S from './SolvedModal.styled';

interface Props {
	problemId: string;
	title: string;
	elapsedMs: number;
	meta: SolvedAcProblemMeta | null;
	onClose: () => void;
}

export default function SolvedModal({
	problemId,
	title,
	elapsedMs,
	meta,
	onClose,
}: Props) {
	const [solveType, setSolveType] = useState<'SELF' | 'SOLUTION'>('SELF');
	const { submitting, submit } = useSubmit();

	const tierShort = meta?.levelShort ?? '';
	const tagList = meta?.tags?.filter(Boolean) ?? [];
	const leftParts = [tierShort, ...tagList].filter(Boolean);
	const bracket = leftParts.length > 0 ? `[${leftParts.join(', ')}] ` : '';

	const handleSubmit = async () => {
		const success = await submit(
			problemId,
			Math.floor(elapsedMs / 1000),
			solveType,
		);
		if (success) {
			alert('성공적으로 저장되었습니다!');
			onClose();
		} else {
			alert('저장에 실패했습니다. 다시 시도해주세요.');
		}
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<S.Overlay onClick={handleOverlayClick}>
			<S.Modal>
				<S.Header>
					<S.TitleGroup>
						<S.Title>문제 풀이 완료!</S.Title>
						<S.Subtitle>
							풀이 기록을 Solta에 저장할 수 있습니다
						</S.Subtitle>
					</S.TitleGroup>
					<S.CloseButton onClick={onClose} aria-label="닫기">
						&times;
					</S.CloseButton>
				</S.Header>

				<S.SolveInfo>
					<S.SolveTime>{formatElapsedKorean(elapsedMs)}</S.SolveTime>
					<S.ProblemTitle>
						{bracket}
						{title || '문제'}
					</S.ProblemTitle>
					<S.ProblemMeta>백준 #{problemId}</S.ProblemMeta>
				</S.SolveInfo>

				<S.FieldGroup>
					<S.FieldLabel>풀이 방식</S.FieldLabel>
					<SolveTypeRadio value={solveType} onChange={setSolveType} />
				</S.FieldGroup>

				<S.Actions>
					<S.SecondaryButton onClick={onClose}>
						취소
					</S.SecondaryButton>
					<S.PrimaryButton
						onClick={handleSubmit}
						disabled={submitting}
					>
						{submitting ? '저장 중...' : '저장하기'}
					</S.PrimaryButton>
				</S.Actions>
			</S.Modal>
		</S.Overlay>
	);
}
