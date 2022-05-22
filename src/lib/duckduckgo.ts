import { SafeSearchType, search } from 'duck-duck-scrape'

export const webSearch = (query: string) =>
  search(query, {
    locale: 'en-us', // The locale(?) of the search
    region: 'wt-wt', // All regions
    marketRegion: 'US', // The market region(?) of the search
    safeSearch: SafeSearchType.OFF,
  })
