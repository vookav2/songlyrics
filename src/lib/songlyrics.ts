import { makeRequest, webSearch } from '../lib'

import htmlParser from 'node-html-parser'
import { makeSources } from '../sources'

const cleanTitleRegexp = /\s(-.+|\[.+\]|\(.+\))/g
const cleanTitle = (title: string) => title.replace(cleanTitleRegexp, '').trim()
export type TLyrics = {
  title: string
  lyrics: string
  source: {
    name: string
    url: string
    link: string
  }
}
export const songlyrics = async (
  title: string,
): Promise<TLyrics | undefined> => {
  const clean = cleanTitle(title).toLowerCase()
  const query = `${clean} intitle:lyrics`
  const ddgResults = await webSearch(query)
  const ddgResult = ddgResults?.shift()
  const sourceName = ddgResult?.i.replace(/(www.|.com)/g, '').toLowerCase()

  const sources = makeSources()
  if (ddgResult && sourceName && sources.has(sourceName)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const source = sources.get(sourceName)!
    const html = await makeRequest(new URL(ddgResult.c))
    const lyrics = await source.parse(htmlParser(html))
    return {
      title: ddgResult.t.replace(/\|.+/g, '').trim(),
      lyrics,
      source: {
        name: source.name,
        url: ddgResult.i,
        link: ddgResult.c,
      },
    }
  }
  return
}
