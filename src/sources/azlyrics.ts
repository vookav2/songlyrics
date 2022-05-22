import { TSource, useSpacingLyrics } from '.'

import { load } from 'cheerio'

const azlyrics: TSource = {
  name: 'AZLyrics',
  hostname: 'www.azlyrics.com',
  path: '/lyrics',
  parse: (html: string): Promise<string> => {
    const $ = load(html)

    const content = $('div.main-page div div.col-xs-12 > div:nth(4)')
      .text()
      .trim()

    return Promise.resolve(useSpacingLyrics(content))
  },
}

export default azlyrics
