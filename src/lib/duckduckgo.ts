import { makeRequest } from './request'

const VQD_REGEX = /vqd='(\d+-\d+-\d+)'/
const SEARCH_REGEX =
  /DDG\.pageLayout\.load\('d',(\[.+\])\);DDG\.duckbar\.load\('images'/

const queryString = (query: Record<string, string>) =>
  new URLSearchParams(query).toString()

const getVQD = async (query: string) => {
  try {
    const vqdRequestUrl = new URL(
      `https://duckduckgo.com/?${queryString({
        q: query,
        ia: 'web',
      })}`,
    )
    const html = await makeRequest(vqdRequestUrl)
    return VQD_REGEX.exec(html)?.at(1)
  } catch (err) {
    throw new Error(`Failed to get the VQD for query "${query}".`)
  }
}

// eslint-disable-next-line complexity
export const webSearch = async (
  query: string,
): Promise<{ c: string; t: string; i: string }[] | undefined> => {
  const vqd = await getVQD(query)
  if (!vqd) {
    throw new Error(`Failed to get the VQD for query "${query}".`)
  }
  const requestParams = new URLSearchParams({
    q: query,
    vqd,
    kl: 'wt-wt',
    l: 'en-us',
    dl: 'en',
    ct: 'US',
    sp: '1',
    df: 'a',
    ss_mkt: 'us',
    s: '0',
    bpa: '1',
    biaexp: 'b',
    msvrtexp: 'b',
    nadse: 'b',
    eclsexp: 'b',
    tjsexp: 'b',
  })
  const requestUrl = new URL(
    `https://links.duckduckgo.com/d.js?${requestParams.toString()}`,
  )
  const responseString = await makeRequest(requestUrl)
  if (/DDG.deep.is506/.test(responseString)) {
    throw new Error('A server error occurred!')
  }
  const raw = SEARCH_REGEX.exec(responseString)?.at(1)?.replace(/\t/g, '    ')
  if (!raw) {
    throw new Error('No results found!')
  }
  return JSON.parse(raw) as any[]
}
