import { Source } from '../types'
import musixmatch from './musixmatch'
import indolirik from './indolirik'
import azlyrics from './azlyrics'
import genius from './genius'
import lyrics from './lyrics'
import songlyrics from './songlyrics'
import liriklaguindonesia from './liriklaguindonesia'

const sources: Source[] = [
	musixmatch,
	azlyrics,
	liriklaguindonesia,
	genius,
	indolirik,
	songlyrics,
	lyrics,
]

export default sources
