import styled from 'styled-components';

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 10px;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
	margin-top: 4px;
`;

export const ProfileLink = styled.a`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	padding: 5px 8px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	transition: background 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.primaryLight};
	}
`;

export const LogoutButton = styled.button.attrs({ type: 'button' })`
	background: transparent;
	color: ${({ theme }) => theme.colors.textMuted};
	border: 1px solid ${({ theme }) => theme.colors.border};
	padding: 5px 12px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.15s ease;
	font-family: ${({ theme }) => theme.fonts.base};

	&:hover {
		color: ${({ theme }) => theme.colors.error};
		background: rgba(239, 83, 80, 0.08);
		border-color: rgba(239, 83, 80, 0.3);
	}
`;
