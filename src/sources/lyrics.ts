import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const lyrics: Source = {
	name: 'Lyrics',
	hostname: 'www.lyrics.com',
	path: '/lyric',
	parse: function ($: CheerioAPI): string {
		return $('pre#lyric-body-text').text().trim()
	},
}

export default lyrics
