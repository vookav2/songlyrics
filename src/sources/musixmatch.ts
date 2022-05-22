import { TSource } from '.'
import { load } from 'cheerio'

const musixmatch: TSource = {
  name: 'Musixmatch',
  hostname: 'www.musixmatch.com',
  path: '/lyrics',
  parse: (html: string): Promise<string> => {
    const $ = load(html)

    let lyricsText = ''
    $('p.mxm-lyrics__content').each((_, e) => {
      lyricsText += `${$(e).text()}\n`
    })

    return Promise.resolve(lyricsText)
  },
}

export default musixmatch
