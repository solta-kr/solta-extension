import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
	to { transform: rotate(360deg); }
`;

export const Container = styled.div`
	text-align: center;
	padding: 24px 0 8px;
`;

export const Illustration = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	margin: 0 auto 16px;
	border-radius: ${({ theme }) => theme.borderRadius.md};
	background: ${({ theme }) => theme.colors.primaryLight};
	color: ${({ theme }) => theme.colors.primary};
`;

export const Heading = styled.h2`
	margin: 0 0 6px;
	font-size: 16px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
`;

export const Desc = styled.p`
	margin: 0 0 24px;
	font-size: 13px;
	color: ${({ theme }) => theme.colors.textMuted};
	line-height: 1.5;
`;

export const GitHubButton = styled.button`
	position: relative;
	background: ${({ theme }) => theme.colors.bgTertiary};
	color: ${({ theme }) => theme.colors.text};
	border: 1px solid ${({ theme }) => theme.colors.border};
	padding: 11px 20px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	width: 100%;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-family: ${({ theme }) => theme.fonts.base};

	&:hover:not(:disabled) {
		background: ${({ theme }) => theme.colors.border};
		border-color: ${({ theme }) => theme.colors.borderLight};
		transform: translateY(-1px);
		box-shadow: ${({ theme }) => theme.shadows.sm};
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

export const Spinner = styled.span`
	display: inline-block;
	width: 16px;
	height: 16px;
	border: 2px solid ${({ theme }) => theme.colors.border};
	border-top-color: ${({ theme }) => theme.colors.primary};
	border-radius: 50%;
	animation: ${rotate} 0.6s linear infinite;
`;
