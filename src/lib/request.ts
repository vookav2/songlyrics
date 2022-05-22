import got, { OptionsOfTextResponseBody } from 'got'

export const makeHttpRequest = ({
  randomUserAgent,
}: {
  randomUserAgent: () => string
}) => {
  const request = (url: string, options?: OptionsOfTextResponseBody) =>
    got(url, {
      headers: {
        'User-Agent': randomUserAgent(),
      },
      ...options,
    })
  return request
}
