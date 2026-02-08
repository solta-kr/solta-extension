import { useState } from 'react';
import type { SolvedAcProblemMeta } from '../../../../shared/types/solved-ac';
import { getTierColor } from '../../../../shared/utils/tier';
import SolveTypeRadio from '../SolveTypeRadio/SolveTypeRadio';
import { useSubmit } from '../../hooks/useSubmit';
import * as S from './SolvedModal.styled';

function msToHms(ms: number) {
	const totalSec = Math.floor(ms / 1000);
	return {
		h: Math.floor(totalSec / 3600),
		m: Math.floor((totalSec % 3600) / 60),
		s: totalSec % 60,
	};
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

interface Props {
	problemId: string;
	title: string;
	elapsedMs: number | null;
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
	const initial = elapsedMs != null ? msToHms(elapsedMs) : { h: 0, m: 0, s: 0 };
	const [hours, setHours] = useState(String(initial.h));
	const [minutes, setMinutes] = useState(String(initial.m));
	const [seconds, setSeconds] = useState(String(initial.s));
	const [solveType, setSolveType] = useState<'SELF' | 'SOLUTION'>('SELF');
	const { submitting, submit } = useSubmit();

	const tierShort = meta?.levelShort ?? '';
	const tierColor = getTierColor(tierShort);
	const tagList = meta?.tags?.filter(Boolean) ?? [];

	const handleTimeChange =
		(setter: (v: string) => void, max: number) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value.replace(/\D/g, '');
			if (raw === '') {
				setter('');
				return;
			}
			setter(String(clamp(Number(raw), 0, max)));
		};

	const handleTimeBlur =
		(value: string, setter: (v: string) => void) => () => {
			const n = Number(value);
			setter(String(Number.isFinite(n) && n > 0 ? n : 0));
		};

	const getTotalSeconds = (): number | null => {
		const h = Number(hours) || 0;
		const m = Number(minutes) || 0;
		const s = Number(seconds) || 0;
		const total = h * 3600 + m * 60 + s;
		return total > 0 ? total : null;
	};

	const handleSubmit = async () => {
		const solveTimeSeconds = getTotalSeconds();
		const success = await submit(problemId, solveTimeSeconds, solveType);
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
					<S.TierBar $color={tierColor} />
					<S.ProblemContent>
						<S.ProblemHeader>
							<S.ProblemNumber>#{problemId}</S.ProblemNumber>
							{tierShort && (
								<S.TierBadge $color={tierColor}>
									{tierShort}
								</S.TierBadge>
							)}
						</S.ProblemHeader>
						<S.ProblemTitle>
							{title || '문제'}
						</S.ProblemTitle>
						{tagList.length > 0 && (
							<S.TagList>
								{tagList.slice(0, 4).map((tag) => (
									<S.Tag key={tag}>{tag}</S.Tag>
								))}
								{tagList.length > 4 && (
									<S.Tag>+{tagList.length - 4}</S.Tag>
								)}
							</S.TagList>
						)}
					</S.ProblemContent>
				</S.SolveInfo>

				<S.FieldGroup>
					<S.FieldLabel>풀이 시간</S.FieldLabel>
					<S.TimeInputGroup>
						<S.TimeInputUnit>
							<S.TimeInput
								type="number"
								min={0}
								max={99}
								value={hours}
								onChange={handleTimeChange(setHours, 99)}
								onBlur={handleTimeBlur(hours, setHours)}
								placeholder="0"
							/>
							<S.TimeUnitLabel>시간</S.TimeUnitLabel>
						</S.TimeInputUnit>
						<S.TimeSeparator>:</S.TimeSeparator>
						<S.TimeInputUnit>
							<S.TimeInput
								type="number"
								min={0}
								max={59}
								value={minutes}
								onChange={handleTimeChange(setMinutes, 59)}
								onBlur={handleTimeBlur(minutes, setMinutes)}
								placeholder="0"
							/>
							<S.TimeUnitLabel>분</S.TimeUnitLabel>
						</S.TimeInputUnit>
						<S.TimeSeparator>:</S.TimeSeparator>
						<S.TimeInputUnit>
							<S.TimeInput
								type="number"
								min={0}
								max={59}
								value={seconds}
								onChange={handleTimeChange(setSeconds, 59)}
								onBlur={handleTimeBlur(seconds, setSeconds)}
								placeholder="0"
							/>
							<S.TimeUnitLabel>초</S.TimeUnitLabel>
						</S.TimeInputUnit>
					</S.TimeInputGroup>
				</S.FieldGroup>

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
