import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const indolirik: Source = {
	name: 'IndoLirik',
	hostname: 'indolirik.jspinyin.net',
	path: '/',
	parse: function ($: CheerioAPI): string {
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
	},
}

export default indolirik
