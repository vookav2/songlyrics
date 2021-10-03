import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const songlyrics: Source = {
	name: 'songlyrics',
	hostname: 'www.songlyrics.com',
	path: '/',
	parse: function ($: CheerioAPI): string {
		return $('p#songLyricsDiv').text().trim()
	},
}

export default songlyrics
