import { CheerioAPI } from 'cheerio'
import { Source } from '../types'

const liriklaguindonesia: Source = {
	name: 'LirikLaguIndonesia',
	hostname: 'liriklaguindonesia.net',
	path: '/',
	parse: function ($: CheerioAPI): string {
		throw new Error('Function not implemented.')
	},
}

export default liriklaguindonesia
