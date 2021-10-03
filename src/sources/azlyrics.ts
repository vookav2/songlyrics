import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const azlyrics: Source = {
	name: 'AZLyrics',
	hostname: 'www.azlyrics.com',
	path: '/lyrics',
	parse: function ($: CheerioAPI): string {
		const content = $('div.main-page div div.col-xs-12 > div:nth(4)')
			.text()
			.trim()
		return content
	},
}

export default azlyrics
