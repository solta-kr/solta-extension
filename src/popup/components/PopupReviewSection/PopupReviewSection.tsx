import { useState } from 'react';
import { getTierColor } from '../../../shared/utils/tier';
import { CLIENT_URL } from '../../../shared/constants/config';
import type { ReviewListResponse, ReviewItem } from '../../../shared/types/api';
import * as S from './PopupReviewSection.styled';

type ReviewTab = 'overdue' | 'today' | 'scheduled';

const MAX_ITEMS = 3;

function getToday(): string {
	return new Date().toISOString().split('T')[0] ?? '';
}

function getDayDiff(dateA: string, dateB: string): number {
	return Math.round(
		(new Date(dateA).getTime() - new Date(dateB).getTime()) / (1000 * 60 * 60 * 24),
	);
}

function getDayLabel(item: ReviewItem, today: string): string {
	if (item.isOverdue) {
		const days = getDayDiff(today, item.scheduledDate);
		return `${days}일 밀림`;
	}
	if (item.scheduledDate === today) return '오늘';
	const days = getDayDiff(item.scheduledDate, today);
	return `${days}일 후`;
}

interface Props {
	username: string;
	reviews: ReviewListResponse | undefined;
	isLoading: boolean;
}

export default function PopupReviewSection({ username, reviews, isLoading }: Props) {
	const [activeTab, setActiveTab] = useState<ReviewTab>('overdue');
	const today = getToday();

	const overdue = reviews?.reviews.filter((r) => r.isOverdue) ?? [];
	const todayList =
		reviews?.reviews.filter((r) => !r.isOverdue && r.scheduledDate === today) ?? [];
	const scheduled =
		reviews?.reviews.filter((r) => !r.isOverdue && r.scheduledDate > today) ?? [];

	const tabMap: Record<ReviewTab, ReviewItem[]> = { overdue, today: todayList, scheduled };
	const currentItems = tabMap[activeTab];
	const displayItems = currentItems.slice(0, MAX_ITEMS);
	const overflowCount = currentItems.length - MAX_ITEMS;

	const profileUrl = `${CLIENT_URL}/profile/${username}`;

	return (
		<S.Section>
			<S.SectionHeader>
				<S.SectionTitle>복습 대기</S.SectionTitle>
				<S.AllLink href={profileUrl} target="_blank" rel="noopener noreferrer">
					→
				</S.AllLink>
			</S.SectionHeader>

			<S.InnerBox>
				<S.TabBar>
					<S.Tab $active={activeTab === 'overdue'} onClick={() => setActiveTab('overdue')}>
						밀린 복습
						{!isLoading && (
							<S.TabBadge $variant="overdue" $count={overdue.length}>
								{overdue.length}
							</S.TabBadge>
						)}
					</S.Tab>
					<S.Tab $active={activeTab === 'today'} onClick={() => setActiveTab('today')}>
						오늘
						{!isLoading && (
							<S.TabBadge $variant="today" $count={todayList.length}>
								{todayList.length}
							</S.TabBadge>
						)}
					</S.Tab>
					<S.Tab $active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')}>
						예정
						{!isLoading && (
							<S.TabBadge $variant="scheduled" $count={scheduled.length}>
								{scheduled.length}
							</S.TabBadge>
						)}
					</S.Tab>
				</S.TabBar>

				<S.ReviewList>
					{isLoading ? (
						<>
							<S.SkeletonCard />
							<S.SkeletonCard />
						</>
					) : displayItems.length === 0 ? (
						<S.EmptyState>
							{activeTab === 'overdue' && '밀린 복습이 없어요'}
							{activeTab === 'today' && '오늘 복습할 문제가 없어요 🎉'}
							{activeTab === 'scheduled' && '복습 예정 문제가 없어요'}
						</S.EmptyState>
					) : (
						<>
							{displayItems.map((item, i) => (
								<S.ReviewCard key={item.id} $first={i === 0}>
									<S.ReviewInfo>
										<S.ProblemTitle>
											<S.ProblemNum>#{item.problem.bojProblemId}</S.ProblemNum>
											{item.problem.title}
										</S.ProblemTitle>
										<S.ReviewMeta>
											{item.problem.tier && (
												<>
													<S.TierChip $color={getTierColor(item.problem.tier)}>
														{item.problem.tier}
													</S.TierChip>
													<S.Dot>·</S.Dot>
												</>
											)}
											<S.DayChip $overdue={item.isOverdue}>
												{getDayLabel(item, today)}
											</S.DayChip>
										</S.ReviewMeta>
									</S.ReviewInfo>
									<S.ReviewLink
										href={`https://boj.kr/${item.problem.bojProblemId}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										복습하기
									</S.ReviewLink>
								</S.ReviewCard>
							))}
							{overflowCount > 0 && (
								<S.MoreLink href={profileUrl} target="_blank" rel="noopener noreferrer">
									+{overflowCount}개 더 있어요
								</S.MoreLink>
							)}
						</>
					)}
				</S.ReviewList>
			</S.InnerBox>
		</S.Section>
	);
}
