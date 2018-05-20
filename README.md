# dubnium-cli

The boilerplate manager to rule 'em all. Language agnostic, built upon Git and highly configurable. Unifies angular-cli, vue-cli, CNA, CRNA and CRA.

## Install

```zsh
# With npm.
npm install --global dubnium-cli

# With yarn.
yarn global add dubnium-cli
```

### README below here in progress

## Usage

```zsh
$ dubnium --help
  Usage
    $ dubnium [subcommand] (--options) [GitHub/npm boilerplate]

  Subcommands
    create - Create a new project in a specified subfolder based on a boilerplate.
      Usage: dubnium create [project name] [boilerplate] (flags)
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
    Project my-speshul-discord-bot created 🎉
```

## License

Apache 2.0 © [RSG-Group](https://github.com/RSG-Group)
