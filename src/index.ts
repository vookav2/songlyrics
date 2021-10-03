import { request, searchDuckduckgo, spacingLyrics } from './util'
import { Lyrics, Source, SourceLyrics } from './types'
import { format } from 'util'
import cheerio from 'cheerio'
import sources from './sources/index'

async function songlyrics(title: string): Promise<Lyrics> {
	title = title.toLowerCase()
	const f = '%s site:%s'
	try {
		for (const source of sources) {
			const site = `${source.hostname}${source.path}`
			const url = await searchDuckduckgo(format(f, title, site))
			if (url.includes(site.toLowerCase())) {
				const res = await request(url)
				let lyrics = source.parse(cheerio.load(res))
				if (lyrics) {
					const sourceLyrics: SourceLyrics = {
						name: source.name,
						url: `https://${source.hostname}`,
						link: url,
					}
					const result = { lyrics: spacingLyrics(lyrics), source: sourceLyrics }
					return result
				}
			}
		}
	} catch (err) {}
	throw new Error('No lyrics found!')
}

export { Lyrics }
export default songlyrics
