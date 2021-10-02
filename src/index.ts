import { request } from './util'
import { Lyrics, Source } from './types'
import { format } from 'util'
import cheerio from 'cheerio'
import sources from './sources/index'

async function songlyrics(title: string): Promise<Lyrics> {
	try {
		for (const source of sources) {
			const res = await request(format(source.url, title))
			if (source.valid(res)){
				const lyrics = await source.parse(cheerio.load(res), request)
				if (lyrics.lyrics) return lyrics
			}
		}
	} catch (err) {
		console.warn(err)
	}
	throw new Error('No lyrics found!')
}

export { Lyrics }
export default songlyrics
