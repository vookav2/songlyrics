import { https } from 'follow-redirects'
const { request } = https;
import { RequestOptions } from 'https';

export const makeRequest = (url: URL, method = 'GET') => {
  const options: RequestOptions = {
    hostname: url.hostname,
    port: url.protocol.startsWith('https') ? 443 : 80,
    path: `${url.pathname}${url.search}`,
    method: method,
  }
  return new Promise<string>((resolve, reject) => {
    const req = request(options, res => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
        return reject(
          new Error(`Failed to get the response: ${res.statusCode}`),
        )
      }
      const data: any[] = []
      res.on('data', chunk => {
        data.push(chunk)
      })
      res.on('end', () => resolve(Buffer.concat(data).toString('utf8')))
    })
    req.on('error', reject)
    req.end()
  })
}
