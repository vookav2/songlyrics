import { HTMLElement } from 'node-html-parser'

export const genius = {
  name: 'Genius',
  parse: (html: HTMLElement): Promise<string> => {
    const content = html
      .querySelectorAll('div[data-lyrics-container=true]')
      .map(x => x.structuredText)
      .join('')
      .replace(/\[.+\]/g, '')
      .trim()

    return Promise.resolve(content)
  },
}
