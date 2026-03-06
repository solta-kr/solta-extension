import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
	0%, 100% { opacity: 0.35; }
	50% { opacity: 0.7; }
`;

export const Card = styled.div`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	padding: 14px;
	margin-bottom: 10px;
`;

export const TopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
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

export const UserMeta = styled.div`
	flex: 1;
	min-width: 0;
`;

export const NameRow = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 3px;
`;

export const Username = styled.div`
	font-weight: 600;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const LevelBadge = styled.span<{ $color: string }>`
	flex-shrink: 0;
	font-size: 11px;
	font-weight: 700;
	color: ${({ $color }) => $color};
	background: ${({ $color }) => `${$color}22`};
	border: 1px solid ${({ $color }) => `${$color}44`};
	border-radius: 4px;
	padding: 1px 5px;
`;

export const LevelTitle = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.textMuted};
`;

export const Divider = styled.div`
	height: 1px;
	background: ${({ theme }) => theme.colors.border};
	margin: 12px 0;
`;

export const XpSection = styled.div``;

export const ProgressTrack = styled.div`
	height: 6px;
	background: ${({ theme }) => theme.colors.bgTertiary};
	border-radius: 3px;
	overflow: hidden;
	margin-bottom: 7px;
`;

export const ProgressFill = styled.div<{ $percent: number; $color: string }>`
	height: 100%;
	width: ${({ $percent }) => Math.min(100, $percent)}%;
	background: ${({ $color }) => $color};
	border-radius: 3px;
	transition: width 0.4s ease;
`;

export const XpRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

export const XpMain = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.textSecondary};
`;

export const XpSub = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.colors.textMuted};
`;

/* Skeleton elements */
const SkeletonBase = styled.div`
	background: ${({ theme }) => theme.colors.bgTertiary};
	border-radius: 4px;
	animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const SkeletonBadge = styled(SkeletonBase)`
	width: 36px;
	height: 18px;
	border-radius: 4px;
`;

export const SkeletonLine = styled(SkeletonBase)<{ $width: string }>`
	height: 12px;
	width: ${({ $width }) => $width};
`;

export const XpSkeleton = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const SkeletonBar = styled(SkeletonBase)`
	height: 6px;
	width: 100%;
	border-radius: 3px;
`;
