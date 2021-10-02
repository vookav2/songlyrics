import { CheerioAPI } from 'cheerio'
import { Lyrics, Source, Request } from '../types'

const musixmatch: Source = {
	url: 'https://www.musixmatch.com/search/%s',
	valid: function (res: string): boolean {
		return !res.includes('No tracks found') && 
		!res.includes('Something′s in the air')
	},
	parse: async ($: CheerioAPI, req: Request): Promise<Lyrics> => {
		const lyricsUrl = `https://www.musixmatch.com${
			$('a.title').attr('href') as string
		}`
		return req(lyricsUrl)
			.then((html) => $.load(html))
			.then(($) => {
				const lyrics: string[] = []
				$('body span.lyrics__content__ok').each((i, el) => {
					lyrics.push($(el).text().trim())
				})
				if (!lyrics.length) throw new Error('No lyrics found!')
				return lyrics.join('\n')
			})
			.then((lyrics) => {
				return {
					lyrics: lyrics,
					source: {
						name: 'Musixmatch',
						url: 'https://www.musixmatch.com',
						link: lyricsUrl,
					},
				}
			})
	},
}

export default musixmatch
