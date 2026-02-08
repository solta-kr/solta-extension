import styled, { keyframes } from 'styled-components';

const backdropIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

const slideUp = keyframes`
	from { transform: translateY(16px) scale(0.98); opacity: 0; }
	to { transform: translateY(0) scale(1); opacity: 1; }
`;

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10000;
	font-family: ${({ theme }) => theme.fonts.base};
	animation: ${backdropIn} 0.2s ease-out;
`;

export const Modal = styled.div`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.lg};
	padding: 28px;
	max-width: 440px;
	width: 90%;
	box-shadow: ${({ theme }) => theme.shadows.lg};
	animation: ${slideUp} 0.3s ease-out;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

export const TitleGroup = styled.div`
	flex: 1;
`;

export const Title = styled.h2`
	font-size: 18px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	margin: 0;
`;

export const Subtitle = styled.p`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.textMuted};
	margin: 4px 0 0;
`;

export const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.textMuted};
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	line-height: 1;
	transition: all 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.bgTertiary};
		color: ${({ theme }) => theme.colors.text};
	}
`;

export const SolveInfo = styled.div`
	background: ${({ theme }) => theme.colors.bg};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	padding: 14px 16px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const TierBar = styled.div<{ $color: string }>`
	width: 6px;
	height: 36px;
	border-radius: 3px;
	background: ${({ $color }) => $color};
	flex-shrink: 0;
`;

export const ProblemContent = styled.div`
	flex: 1;
	min-width: 0;
`;

export const ProblemHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
`;

export const ProblemNumber = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.textMuted};
	flex-shrink: 0;
`;

export const TierBadge = styled.span<{ $color: string }>`
	display: inline-block;
	padding: 1px 7px;
	border-radius: 4px;
	font-size: 11px;
	font-weight: 600;
	border: 1px solid ${({ $color }) => $color};
	color: ${({ $color }) => $color};
	background: transparent;
	flex-shrink: 0;
`;

export const ProblemTitle = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text};
	font-weight: 500;
	margin-bottom: 6px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const TagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
`;

export const Tag = styled.span`
	padding: 2px 8px;
	font-size: 11px;
	font-weight: 500;
	border-radius: 6px;
	background: ${({ theme }) => theme.colors.bgTertiary};
	color: ${({ theme }) => theme.colors.textSecondary};
	white-space: nowrap;
`;

export const ProblemMeta = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.textMuted};
`;

export const TimeInputGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	margin-bottom: 12px;
`;

export const TimeInputUnit = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

export const TimeInput = styled.input`
	width: 56px;
	padding: 8px 4px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	background: ${({ theme }) => theme.colors.bgSecondary};
	color: ${({ theme }) => theme.colors.primary};
	font-size: 22px;
	font-weight: 700;
	text-align: center;
	font-family: ${({ theme }) => theme.fonts.base};
	letter-spacing: -0.5px;
	transition: all 0.2s ease;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
		box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.textMuted};
		font-weight: 400;
	}

	/* Hide number input arrows */
	-moz-appearance: textfield;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const TimeUnitLabel = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.colors.textMuted};
	font-weight: 500;
`;

export const TimeSeparator = styled.span`
	font-size: 20px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.textMuted};
	padding-bottom: 18px;
`;

export const FieldLabel = styled.div`
	font-size: 13px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.textSecondary};
	margin-bottom: 8px;
`;

export const FieldGroup = styled.div`
	margin-bottom: 20px;
`;

export const Actions = styled.div`
	display: flex;
	gap: 10px;
`;

const BaseButton = styled.button`
	flex: 1;
	padding: 10px 16px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.15s ease;
	font-family: ${({ theme }) => theme.fonts.base};
`;

export const PrimaryButton = styled(BaseButton)`
	background: ${({ theme }) => theme.colors.primary};
	color: white;
	border: none;

	&:hover:not(:disabled) {
		background: ${({ theme }) => theme.colors.primaryHover};
		transform: translateY(-1px);
		box-shadow: ${({ theme }) => theme.shadows.sm};
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

export const SecondaryButton = styled(BaseButton)`
	background: transparent;
	color: ${({ theme }) => theme.colors.textSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};

	&:hover {
		background: ${({ theme }) => theme.colors.bgTertiary};
		color: ${({ theme }) => theme.colors.text};
		border-color: ${({ theme }) => theme.colors.borderLight};
	}
`;
