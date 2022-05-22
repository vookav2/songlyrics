import { makeHttpRequest } from './request'
import userAgent from 'user-agents'

const randomUserAgent = () =>
  new userAgent({ deviceCategory: 'desktop' }).random().toString()

export const request = makeHttpRequest({ randomUserAgent })
export { webSearch } from './duckduckgo'
