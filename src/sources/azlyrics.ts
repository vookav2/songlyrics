import { HTMLElement } from 'node-html-parser'

export const azlyrics = {
  name: 'AZLyrics',
  parse: (html: HTMLElement): Promise<string> => {
    let possibleContent = html
      .querySelector('div.ringtone')
      ?.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    if (html.querySelector('span.feat'))
        possibleContent = possibleContent?.nextElementSibling.nextElementSibling
    const content = possibleContent?.textContent.trim()
    return Promise.resolve(`${content}`)
  },
}