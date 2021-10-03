# songlyrics

Search song lyrics. It scrape the lyrics from musixmatch and others.

<p>
  <a href="https://www.npmjs.com/package/songlyrics">
    <img src="https://img.shields.io/npm/v/songlyrics.svg" alt="version" />
  </a>
   <a href="https://packagephobia.now.sh/result?p=songlyrics">
    <img src="https://packagephobia.now.sh/badge?p=songlyrics" alt="install size" />
  </a>
</p>

## Getting started

```shell
npm install songlyrics --save
```

or

```shell
yarn add songlyrics
```

## How to Use

```js
const songlyrics = require('songlyrics').default

songlyrics('breezeblocks')
	.then((lyrics) => console.log(lyrics))
	.catch(console.warn)

// {
//   lyrics: 'She may contain the urge to run away....',
//   source: {
//     name: 'Musixmatch',
//     url: 'https://www.musixmatch.com',
//     link: 'https://www.musixmatch.com/lyrics/alt-J-6/Breezeblocks-2'
//   }
// }
```

## Lyrics provided by

- [Musixmatch](https://www.musixmatch.com)
- [IndoLirik](https://indolirik.jspinyin.net)
- Mores