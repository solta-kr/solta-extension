import styled, { css } from 'styled-components';

export const Group = styled.div`
	display: flex;
	gap: 8px;
`;

export const Option = styled.button<{ $active: boolean }>`
	flex: 1;
	padding: 8px 12px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.15s ease;
	font-family: ${({ theme }) => theme.fonts.base};
	border: 1px solid ${({ theme }) => theme.colors.border};
	background: transparent;
	color: ${({ theme }) => theme.colors.textSecondary};

	&:hover {
		border-color: ${({ theme }) => theme.colors.borderLight};
		color: ${({ theme }) => theme.colors.text};
	}

	${({ $active, theme }) =>
		$active &&
		css`
			background: ${theme.colors.primaryLight};
			border-color: ${theme.colors.primary};
			color: ${theme.colors.primary};
			font-weight: 600;
		`}
`;
