import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const genius: Source = {
	name: 'Genius',
	hostname: 'genius.com',
	path: '/',
	parse: function ($: CheerioAPI): string {
		return $('div.song_body-lyrics div.lyrics').text().trim()
	},
}

export default genius
