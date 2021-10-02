import { CheerioAPI } from 'cheerio'

export interface Source {
	url: string
	valid: (res: string) => boolean
	parse: ($: CheerioAPI, req: Request) => Promise<Lyrics>
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
