import { HTMLElement } from 'node-html-parser'
import { azlyrics } from './azlyrics'
import { genius } from './genius'
import { lyrics } from './lyrics'
import { musixmatch } from './musixmatch'

type Source = {
  name: string
  parse: (html: HTMLElement) => Promise<string>
}
export const makeSources = () => {
  const sources: Map<string, Source> = new Map()
  sources.set('genius', genius)
  sources.set('azlyrics', azlyrics)
  sources.set('musixmatch', musixmatch)
  sources.set('lyrics', lyrics)

  return sources
}
