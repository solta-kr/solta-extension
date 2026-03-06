const TIERS: [string, number][] = [
	['B', 5], ['B', 4], ['B', 3], ['B', 2], ['B', 1],
	['S', 5], ['S', 4], ['S', 3], ['S', 2], ['S', 1],
	['G', 5], ['G', 4], ['G', 3], ['G', 2], ['G', 1],
	['P', 5], ['P', 4], ['P', 3], ['P', 2], ['P', 1],
	['D', 5], ['D', 4], ['D', 3], ['D', 2], ['D', 1],
	['R', 5], ['R', 4], ['R', 3], ['R', 2], ['R', 1],
];

export function mapTierToShort(level: number): string {
	if (level < 1 || level > 30) return '';
	const entry = TIERS[level - 1];
	if (!entry) return '';
	return `${entry[0]}${entry[1]}`;
}

const TIER_COLORS: Record<string, string> = {
	B: 'hsl(30, 70%, 45%)',
	S: 'hsl(210, 15%, 60%)',
	G: 'hsl(45, 100%, 50%)',
	P: 'hsl(175, 60%, 55%)',
	D: 'hsl(200, 100%, 65%)',
	R: 'hsl(350, 85%, 55%)',
};

export function getTierColor(levelShort: string | null | undefined): string {
	if (!levelShort) return 'hsl(0, 0%, 50%)';
	const group = levelShort.charAt(0).toUpperCase();
	return TIER_COLORS[group] ?? 'hsl(0, 0%, 50%)';
}

export interface LevelStyle {
	color: string;
	background: string;
	progressBar: string;
	textColor: string;
	glow?: string;
}

export function getLevelStyle(level: number): LevelStyle {
	if (level >= 100) {
		return {
			color: '#F59E0B',
			background: 'linear-gradient(135deg, #F59E0B, #FBBF24, #FDE68A)',
			progressBar: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
			textColor: '#1a1200',
			glow: '0 0 12px rgba(245,158,11,0.6)',
		};
	}
	if (level >= 91) {
		return {
			color: '#F97316',
			background: 'linear-gradient(135deg, #F97316, #EF4444)',
			progressBar: 'linear-gradient(90deg, #F97316, #EF4444)',
			textColor: '#fff',
			glow: '0 0 10px rgba(249,115,22,0.5)',
		};
	}
	if (level >= 61) {
		return {
			color: '#A78BFA',
			background: 'rgba(167,139,250,0.15)',
			progressBar: 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
			textColor: '#A78BFA',
			glow: '0 0 8px rgba(167,139,250,0.4)',
		};
	}
	if (level >= 31) {
		return {
			color: '#38BDF8',
			background: 'rgba(56,189,248,0.12)',
			progressBar: 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
			textColor: '#38BDF8',
		};
	}
	if (level >= 11) {
		return {
			color: '#34D399',
			background: 'rgba(52,211,153,0.12)',
			progressBar: 'linear-gradient(90deg, #10B981, #34D399)',
			textColor: '#34D399',
		};
	}
	return {
		color: '#94A3B8',
		background: 'rgba(148,163,184,0.12)',
		progressBar: '#94A3B8',
		textColor: '#94A3B8',
	};
}
