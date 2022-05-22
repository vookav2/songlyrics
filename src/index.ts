/* eslint-disable no-await-in-loop */
/* eslint-disable complexity */

import { request, webSearch } from './lib'

import { format } from 'util'
import sources from './sources'

const cleanTitleRegexp = /\s(-.+|\[.+\]|\(.+\))/g
const cleanTitle = (title: string) => title.replace(cleanTitleRegexp, '').trim()
const lyricsNotFound = () => {
  throw new Error('No lyrics found!')
}

export type TLyrics = {
  lyrics: string
  source: {
    name: string
    url: string
    link: string
  }
}

const songlyrics = async (title: string): Promise<TLyrics | undefined> => {
  const queryFormat = '%s site:%s'
  const cleanedTitle = cleanTitle(title).toLowerCase()
  const query = (sourceUrl: string) =>
    format(queryFormat, cleanedTitle, sourceUrl)

  for (const source of sources) {
    const sourceUrl = `${source.hostname}${source.path}`
    const { noResults, results } = await webSearch(query(sourceUrl))
    if (noResults) {
      lyricsNotFound()
    }

    const [result] = results
    if (result.hostname !== source.hostname || !result.url) {
      lyricsNotFound()
    }

    const response = await request(result.url)
    const lyrics = await source.parse(response.body)

    return {
      lyrics: lyrics,
      source: {
        name: result.title.replace(/\s(\|.+)/g, ''),
        url: `https://${result.hostname}`,
        link: result.url,
      },
    }
  }

  lyricsNotFound()
}

export default songlyrics
