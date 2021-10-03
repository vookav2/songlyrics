import got from 'got'
import fs from 'fs'
import UserAgent from 'user-agents'
import { SafeSearchType, search } from 'duck-duck-scrape'
import { format } from 'util'

export async function request(url: string): Promise<string> {
	return got(url, {
		headers: {
			'User-Agent': randomUserAgent,
		},
	}).then((response) => response.body)
}

export function getTimestamps(): number {
	return new Date().getTime()
}

export function saveDumpFile(name: string, raw: string): void {
	void fs.writeFileSync(`dump/${name}`, raw)
}

export function spacingLyrics(lyrics: string): string {
	if (lyrics.includes('\n\n')) return lyrics
	const splitLyrics = lyrics.split('\n')
	const chunkLyrics = chunkArray(splitLyrics, 4)
	return chunkLyrics.map((x) => x.join('\n')).join('\n\n')
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
	const chunk: T[][] = []
	let i: number = 0
	while (i < arr.length) {
		chunk.push(arr.slice(i, (i += size)))
	}
	return chunk
}

export async function searchDuckduckgo(query: string): Promise<string> {
	return search(query, {
		locale: 'id-ID',
		region: 'ID',
		safeSearch: SafeSearchType.OFF,
	}).then((res) => res.results.shift()?.url as string)
}

export const randomUserAgent: string = new UserAgent({
	deviceCategory: 'desktop',
})
	.random()
	.toString()
