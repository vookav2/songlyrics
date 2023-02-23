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
  const query = `${clean} inurl:lyrics`
  const ddgResults = await webSearch(query)
  const sources = makeSources()
  const possibleSites =
    ddgResults
      ?.map(r => {
        r.i = r.i?.replace(/(www\.)?(.*)\.\w+$/g, '$2').toLowerCase()
        return r
      })
      .filter(r => [...sources.keys()].includes(r.i)) || []
  for (const site of possibleSites) {
    const siteName = site?.i
    if (siteName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const source = sources.get(siteName)!
      const html = await makeRequest(new URL(site.c))
      const lyrics = await source.parse(htmlParser(html))
      if (!lyrics) {
        continue
      }
      return {
        title: site.t.replace(/\|.+/g, '').trim(),
        lyrics,
        source: {
          name: source.name,
          url: site.i,
          link: site.c,
        },
      }
    }
  }
  return
}
