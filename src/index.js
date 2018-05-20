#! /usr/bin/env node
import '@babel/polyfill'
import meow from 'meow'
import createOperation from './create'
import sudoBlock from 'sudo-block'

sudoBlock()

const cliArgs = meow(`
  Usage
    $ dubnium [subcommand] (--options) [GitHub/npm boilerplate]

  Subcommands
    create  Create a new project in a specified folder based on a boilerplate.
      Usage: dubnium create [path to project] [boilerplate] (flags)
      e.g. dubnium create test-project create-react-app --dubnium

  Options
    --github  Forces installation from GitHub [Default: autodetect]
    Aliases: gh
    --npm  Forces installation from npm [Default: false]
    --dubnium  Forces check of boilerplate in awesome-dubnium [Default: true, fallback to GitHub]

  Examples
    $ dubnium create test-project example-boilerplate --dubnium
    Created folder test-project
    Cloned example-boilerplate at /tmp/dubnium
    Boilerplated test-project
    Deleted temporary files
    Project test-project created 🎉

    $ dubnium create my-speshul-discord-bot retrixe/IveBot
    Created folder my-speshul-discord-bot
    Cloned retrixe/IveBot at /tmp/dubnium from GitHub
    Boilerplated my-speshul-discord-bot
    Deleted temporary files
    Project my-speshul-discord-bot created 🎉`, {
  flags: {
    github: { type: 'boolean', alias: 'gh' },
    npm: { type: 'boolean' },
    dubnium: { type: 'boolean' }
  },
  inferType: true
})

const subcommands = new Map([
  ['create', createOperation]
])

if (subcommands.has(cliArgs.input[0])) subcommands.get(cliArgs.input[0])(cliArgs)
else {
  console.log(`Error: sub-command does not exist!
Available subcommands: create`)
}
