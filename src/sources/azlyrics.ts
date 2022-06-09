import { HTMLElement } from 'node-html-parser'

export const azlyrics = {
  name: 'AZLyrics',
  parse: (html: HTMLElement): Promise<string> => {
    const content = html
      .querySelector('div.ringtone')
      ?.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent.trim()
    return Promise.resolve(`${content}`)
  },
}
