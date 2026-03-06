export interface XpSummaryResponse {
	totalXp: number;
	level: number;
	title: string;
	currentLevelXp: number;
	nextLevelRequiredXp: number;
	progressPercent: number;
}

export interface ReviewProblemSummary {
	bojProblemId: number;
	title: string;
	tier: string | null;
	tags: string[];
}

export interface ReviewItem {
	id: number;
	scheduledDate: string;
	isOverdue: boolean;
	round: number;
	problem: ReviewProblemSummary;
}

export interface ReviewListResponse {
	overdueCount: number;
	reviews: ReviewItem[];
}
