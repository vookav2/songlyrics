import { HTMLElement } from 'node-html-parser'

export const lyrics = {
  name: 'Lyrics',
  hostname: 'www.lyrics.com',
  path: '/lyric',
  parse: (html: HTMLElement): Promise<string> => {
    const content = html
      .querySelector('pre#lyric-body-text')
      ?.textContent.replace(/(<a.*">|<\/a>)/g, '')
    return Promise.resolve(`${content}`)
  },
}
