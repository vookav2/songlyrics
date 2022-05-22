import { TSource, useSpacingLyrics } from '.'

import { load } from 'cheerio'

const lyrics: TSource = {
  name: 'Lyrics',
  hostname: 'www.lyrics.com',
  path: '/lyric',
  parse: (html: string): Promise<string> => {
    const $ = load(html)
    const parseText = $('pre#lyric-body-text').text().trim()
    return Promise.resolve(useSpacingLyrics(parseText))
  },
}

export default lyrics
