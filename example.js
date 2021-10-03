const songlyrics = require('./build').default

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
