import styled from 'styled-components';

export const Wrapper = styled.div`
	margin-bottom: 16px;
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	overflow: hidden;
`;

export const Container = styled.a`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 14px;
	text-decoration: none;
	color: inherit;
	transition: background 0.15s ease;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.bgTertiary};
	}
`;

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 14px;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const AvatarRing = styled.div`
	padding: 2px;
	border-radius: 50%;
	background: linear-gradient(135deg, #ff9a76, #ff7c5c);
	flex-shrink: 0;
`;

export const Avatar = styled.img`
	display: block;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border: 2px solid ${({ theme }) => theme.colors.bgSecondary};
	object-fit: cover;
`;

export const Details = styled.div`
	flex: 1;
	min-width: 0;
`;

export const Name = styled.div`
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text};
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Username = styled.div`
	color: ${({ theme }) => theme.colors.textMuted};
	font-size: 12px;
	margin-top: 1px;
`;

export const ProfileHint = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.colors.textMuted};
	font-weight: 400;
`;

export const LogoutButton = styled.button`
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
	flex-shrink: 0;

	&:hover {
		color: ${({ theme }) => theme.colors.error};
		background: rgba(239, 83, 80, 0.08);
		border-color: rgba(239, 83, 80, 0.3);
	}
`;
