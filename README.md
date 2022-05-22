# songlyrics

Search a lyrics. It scrapes the lyrics from unofficial sources.

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
const songlyrics = require('songlyrics')

songlyrics('breezeblocks')
  .then(lyrics => console.log(lyrics))
  .catch(console.warn)

// {
//   lyrics: 'She may contain the urge to run away....',
//   source: {
//     name: '...',
//     url: 'https://...',
//     link: 'https://...'
//   }
// }
```

## The Lyrics provided by following unofficial sources

- [Musixmatch](https://www.musixmatch.com)
- [AZLyrics](https://www.azlyrics.com)
- [Lyrics](https://www.lyrics.com)
