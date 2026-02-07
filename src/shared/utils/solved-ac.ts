import type { SolvedAcProblemMeta } from '../types/solved-ac';
import { mapTierToShort } from './tier';

interface SolvedAcTag {
	displayNames?: Array<{ language: string; name?: string; short?: string }>;
}

export async function fetchProblemMeta(
	problemId: string,
): Promise<SolvedAcProblemMeta> {
	const url = `https://solved.ac/api/v3/problem/show?problemId=${encodeURIComponent(problemId)}`;
	const res = await fetch(url, { credentials: 'omit' });
	if (!res.ok) throw new Error('failed to fetch solved.ac');
	const json = (await res.json()) as {
		level: number;
		titleKo?: string;
		title?: string;
		tags?: SolvedAcTag[];
	};

	const levelShort = mapTierToShort(json.level);
	const titleKo = json.titleKo ?? json.title ?? '';
	const tags = Array.isArray(json.tags)
		? json.tags
				.map((t) => {
					const ko = t.displayNames?.find((d) => d.language === 'ko');
					return ko?.name ?? ko?.short ?? null;
				})
				.filter((name): name is string => !!name)
		: [];
	const mainTag = tags[0] ?? '';

	return { level: json.level, levelShort, titleKo, tags, mainTag };
}
