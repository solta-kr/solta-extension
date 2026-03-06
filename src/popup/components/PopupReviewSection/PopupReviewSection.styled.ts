import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
	0%, 100% { opacity: 0.35; }
	50% { opacity: 0.7; }
`;

export const Section = styled.div`
	margin-bottom: 10px;
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;
`;

export const SectionTitle = styled.h3`
	margin: 0;
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AllLink = styled.a`
	font-size: 13px;
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	padding: 2px 6px;
	border-radius: 4px;
	transition: background 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.primaryLight};
	}
`;

export const InnerBox = styled.div`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	overflow: hidden;
`;

export const TabBar = styled.div`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button.attrs({ type: 'button' })<{ $active: boolean }>`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	padding: 8px 4px;
	background: transparent;
	border: none;
	cursor: pointer;
	font-size: 12px;
	font-weight: ${({ $active }) => ($active ? 600 : 400)};
	color: ${({ $active, theme }) =>
		$active ? theme.colors.text : theme.colors.textMuted};
	border-bottom: 2px solid
		${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
	transition: all 0.15s ease;
	font-family: ${({ theme }) => theme.fonts.base};

	&:hover {
		color: ${({ theme }) => theme.colors.text};
		background: ${({ theme }) => theme.colors.bgTertiary};
	}
`;

export const TabBadge = styled.span<{
	$variant: 'overdue' | 'today' | 'scheduled';
	$count: number;
}>`
	font-size: 10px;
	font-weight: 600;
	padding: 1px 5px;
	border-radius: 8px;
	background: ${({ $variant, $count, theme }) => {
		if ($count === 0) return theme.colors.bgTertiary;
		if ($variant === 'overdue') return 'rgba(239, 83, 80, 0.15)';
		if ($variant === 'today') return 'rgba(91, 159, 237, 0.15)';
		return 'rgba(138, 141, 145, 0.2)';
	}};
	color: ${({ $variant, $count, theme }) => {
		if ($count === 0) return theme.colors.textMuted;
		if ($variant === 'overdue') return theme.colors.error;
		if ($variant === 'today') return theme.colors.primary;
		return theme.colors.textMuted;
	}};
`;

export const ReviewList = styled.div`
	padding: 4px 0;
`;

export const ReviewCard = styled.div<{ $first: boolean }>`
	padding: 10px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	border-top: ${({ $first, theme }) =>
		$first ? 'none' : `1px solid ${theme.colors.border}`};
`;

export const ReviewInfo = styled.div`
	flex: 1;
	min-width: 0;
`;

export const ProblemTitle = styled.div`
	font-size: 13px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.text};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 4px;
`;

export const ProblemNum = styled.span`
	color: ${({ theme }) => theme.colors.textMuted};
	font-size: 12px;
	margin-right: 6px;
`;

export const ReviewMeta = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const TierChip = styled.span<{ $color: string }>`
	font-size: 11px;
	font-weight: 600;
	color: ${({ $color }) => $color};
`;

export const Dot = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.colors.textMuted};
`;

export const DayChip = styled.span<{ $overdue: boolean }>`
	font-size: 11px;
	color: ${({ $overdue, theme }) => ($overdue ? theme.colors.error : theme.colors.textMuted)};
`;

export const ReviewLink = styled.a`
	flex-shrink: 0;
	font-size: 11px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	border: 1px solid ${({ theme }) => theme.colors.primary}44;
	border-radius: 5px;
	padding: 3px 8px;
	transition: all 0.15s ease;
	white-space: nowrap;

	&:hover {
		background: ${({ theme }) => theme.colors.primaryLight};
	}
`;

export const EmptyState = styled.div`
	padding: 20px 12px;
	text-align: center;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.textMuted};
`;

export const MoreLink = styled.a`
	display: block;
	text-align: center;
	padding: 8px 12px;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
	transition: background 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.bgTertiary};
	}
`;

const SkeletonBase = styled.div`
	background: ${({ theme }) => theme.colors.bgTertiary};
	border-radius: 4px;
	animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const SkeletonCard = styled(SkeletonBase)`
	height: 52px;
	margin: 8px 12px;
	border-radius: 6px;
`;
