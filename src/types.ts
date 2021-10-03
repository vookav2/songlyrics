import { CheerioAPI } from 'cheerio'

export interface Source {
	name: string
	hostname: string
	path: string
	parse: ($: CheerioAPI) => string
}
export interface SourceLyrics {
	name: string
	url: string
	link: string
}
export interface Lyrics {
	lyrics: string
	source: SourceLyrics
}
export interface Request {
	(url: string): Promise<string>
}
