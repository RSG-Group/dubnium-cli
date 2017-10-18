const meow = require('meow')

const help = meow(`
  Usage
    $ lenin (--options) [GitHub/npm boilerplate]
  Options
    --github  Forces installation from GitHub [Default: autodetect]
    --npm  Forces installation from npm [Default: false]
    --lenin  Forces check of boilerplate in awesome-lenin [Default: true, fallback to GitHub] 
  Examples
    $ lenin [boilerplate]
    WIP from here..
    $ lenin ponies
    ponies & rainbows
`)
