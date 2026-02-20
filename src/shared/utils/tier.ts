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

export function getTierColor(levelShort: string): string {
	const group = levelShort.charAt(0).toUpperCase();
	return TIER_COLORS[group] ?? 'hsl(0, 0%, 50%)';
}
