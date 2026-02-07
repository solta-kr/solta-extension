import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 14px;
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	margin-bottom: 16px;
	transition: border-color 0.2s ease;

	&:hover {
		border-color: ${({ theme }) => theme.colors.borderLight};
	}
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
