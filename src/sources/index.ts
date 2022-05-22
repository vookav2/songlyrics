import azlyrics from './azlyrics'
import lyrics from './lyrics'
import musixmatch from './musixmatch'

const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunk: T[][] = []
  let i = 0
  while (i < arr.length) {
    chunk.push(arr.slice(i, (i += size)))
  }
  return chunk
}

export const useSpacingLyrics = (lyrics: string): string => {
  if (lyrics.includes('\n\n')) {
    return lyrics
  }
  const splitLyrics = lyrics.split('\n')
  const chunkLyrics = chunkArray(splitLyrics, 4)
  return chunkLyrics.map(x => x.join('\n')).join('\n\n')
}

export type TSource = {
  name: string
  hostname: string
  path: string
  parse: (html: string) => Promise<string>
}

const sources: TSource[] = [musixmatch, azlyrics, lyrics]

export default sources
