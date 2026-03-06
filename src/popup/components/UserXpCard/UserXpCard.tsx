import { getLevelColor } from '../../../shared/utils/tier';
import type { XpSummaryResponse } from '../../../shared/types/api';
import * as S from './UserXpCard.styled';

interface Props {
	username: string;
	avatarUrl: string;
	xpSummary: XpSummaryResponse | undefined;
	isLoading: boolean;
}

export default function UserXpCard({ username, avatarUrl, xpSummary, isLoading }: Props) {
	const levelColor = xpSummary ? getLevelColor(xpSummary.level) : undefined;
	const remaining = xpSummary
		? xpSummary.nextLevelRequiredXp - xpSummary.currentLevelXp
		: 0;

	return (
		<S.Card>
			<S.TopRow>
				<S.AvatarRing>
					<S.Avatar src={avatarUrl} alt={username} />
				</S.AvatarRing>
				<S.UserMeta>
					<S.NameRow>
						<S.Username>{username}</S.Username>
						{isLoading ? (
							<S.SkeletonBadge />
						) : xpSummary && levelColor ? (
							<S.LevelBadge $color={levelColor}>Lv.{xpSummary.level}</S.LevelBadge>
						) : null}
					</S.NameRow>
					{isLoading ? (
						<S.SkeletonLine $width="55%" />
					) : (
						<S.LevelTitle>{xpSummary?.title ?? ''}</S.LevelTitle>
					)}
				</S.UserMeta>
			</S.TopRow>

			<S.Divider />

			{isLoading ? (
				<S.XpSkeleton>
					<S.SkeletonBar />
					<S.SkeletonLine $width="75%" />
				</S.XpSkeleton>
			) : xpSummary && levelColor ? (
				<S.XpSection>
					<S.ProgressTrack>
						<S.ProgressFill
							$percent={xpSummary.progressPercent}
							$color={levelColor}
						/>
					</S.ProgressTrack>
					<S.XpRow>
						<S.XpMain>
							{xpSummary.currentLevelXp.toLocaleString('ko-KR')} /{' '}
							{xpSummary.nextLevelRequiredXp.toLocaleString('ko-KR')} XP
						</S.XpMain>
						<S.XpSub>다음 레벨까지 {remaining.toLocaleString('ko-KR')} XP</S.XpSub>
					</S.XpRow>
				</S.XpSection>
			) : null}
		</S.Card>
	);
}
