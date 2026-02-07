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
	padding: 20px;
	margin-bottom: 20px;
	text-align: center;
`;

export const SolveTime = styled.div`
	font-size: 28px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 8px;
	letter-spacing: -0.5px;
`;

export const ProblemTitle = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text};
	font-weight: 500;
	margin-bottom: 4px;
`;

export const ProblemMeta = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.textMuted};
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
