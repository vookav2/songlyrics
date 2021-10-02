import got from 'got'
import fs from 'fs'

export async function request(url: string): Promise<string> {
	return got(url).then((response) => response.body)
}

export function getTimestamps(): number {
	return new Date().getTime()
}

export function saveDumpFile(name: string, raw: string): void {
	void fs.writeFileSync(`dump/${name}`, raw)
}