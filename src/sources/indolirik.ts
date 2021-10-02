import { CheerioAPI } from 'cheerio'
import { Lyrics, Source, Request } from '../types'

const musixmatch: Source = {
	url: 'https://indolirik.jspinyin.net/?s=%s',
	valid: function (res: string): boolean {
		return !res.includes('Nothing Found')
	},
	parse: async ($: CheerioAPI, req: Request): Promise<Lyrics> => {
		const lyricsUrl = $('h2.entry-title a').attr('href') as string
		return req(lyricsUrl)
			.then((html) => $.load(html))
			.then(($) => {
				const lyrics: string[] = []
				$('div.entry-content > p').each((i, el) => {
					lyrics.push(
						$(el)
							.text()
							.trim()
							.replace('Find more lyrics at indolirik.jspinyin.net', '')
					)
				})
				if (!lyrics.length) throw new Error('No lyrics found!')
				return lyrics.slice(2).slice(0, -4).join('\n\n')
			})
			.then((lyrics) => {
				return {
					lyrics: lyrics,
					source: {
						name: 'IndoLirik',
						url: 'https://indolirik.jspinyin.net',
						link: lyricsUrl,
					},
				}
			})
	},
}

export default musixmatch
