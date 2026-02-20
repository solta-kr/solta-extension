import { useState, useEffect } from 'react';
import type { SolvedAcProblemMeta } from '../../../../shared/types/solved-ac';
import type { CheckAuthResponse, LoginResponse } from '../../../../shared/types/chrome-messages';
import { getTierColor } from '../../../../shared/utils/tier';
import { sendMessageAsync } from '../../../../shared/utils/chrome-messaging';
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
	const [includeTime, setIncludeTime] = useState(true);
	const [memo, setMemo] = useState('');
	const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
	const { submitting, submit } = useSubmit();

	useEffect(() => {
		sendMessageAsync<CheckAuthResponse>({ type: 'CHECK_AUTH' })
			.then((res) => setLoggedIn(res?.loggedIn ?? false))
			.catch(() => setLoggedIn(false));
	}, []);

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

	const [loggingIn, setLoggingIn] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

	const showToast = (message: string, type: 'success' | 'error') => {
		setToast({ message, type });
		if (type === 'success') {
			setTimeout(() => onClose(), 1500);
		} else {
			setTimeout(() => setToast(null), 3000);
		}
	};

	const handleLogin = async () => {
		setLoggingIn(true);
		try {
			const res = await sendMessageAsync<LoginResponse>({ type: 'LOGIN' });
			if (res?.success) {
				setLoggedIn(true);
			}
		} finally {
			setLoggingIn(false);
		}
	};

	const handleSubmit = async () => {
		const solveTimeSeconds = solveType === 'SOLUTION' && !includeTime ? null : getTotalSeconds();
		const success = await submit(problemId, solveTimeSeconds, solveType, memo);
		if (success) {
			showToast('저장되었습니다!', 'success');
		} else {
			showToast('저장에 실패했습니다. 다시 시도해주세요.', 'error');
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
					<S.FieldLabel>
						풀이 시간
						{solveType === 'SOLUTION' && (
							<S.OptionalBadge>선택</S.OptionalBadge>
						)}
					</S.FieldLabel>
					{solveType === 'SOLUTION' && (
						<S.TimeToggle>
							<S.TimeToggleCheckbox
								id="include-time"
								type="checkbox"
								checked={includeTime}
								onChange={(e) => setIncludeTime(e.target.checked)}
							/>
							<S.TimeToggleLabel htmlFor="include-time">
								시간 기록하기
							</S.TimeToggleLabel>
						</S.TimeToggle>
					)}
					{(solveType === 'SELF' || includeTime) && (
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
					)}
				</S.FieldGroup>

				<S.FieldGroup>
					<S.FieldLabel>풀이 방식</S.FieldLabel>
					<SolveTypeRadio value={solveType} onChange={setSolveType} />
				</S.FieldGroup>

				<S.FieldGroup>
					<S.FieldLabel>
						메모
						<S.OptionalBadge>선택</S.OptionalBadge>
					</S.FieldLabel>
					<S.MemoTextarea
						value={memo}
						onChange={(e) => setMemo(e.target.value)}
						placeholder="풀이 메모를 남겨보세요..."
						rows={3}
					/>
				</S.FieldGroup>

				<S.Actions>
					<S.SecondaryButton onClick={onClose}>
						취소
					</S.SecondaryButton>
					{loggedIn === false ? (
						<S.LoginRequiredButton
							onClick={handleLogin}
							disabled={loggingIn}
						>
							{loggingIn ? '로그인 중...' : '로그인 후 저장하기'}
						</S.LoginRequiredButton>
					) : (
						<S.PrimaryButton
							onClick={handleSubmit}
							disabled={submitting || loggedIn === null}
						>
							{loggedIn === null
								? '확인 중...'
								: submitting
									? '저장 중...'
									: '저장하기'}
						</S.PrimaryButton>
					)}
				</S.Actions>

				{toast && (
					<S.Toast $type={toast.type}>{toast.message}</S.Toast>
				)}
			</S.Modal>
		</S.Overlay>
	);
}
