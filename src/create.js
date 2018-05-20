import { mkdirSync } from 'fs'
import { join, isAbsolute } from 'path'
import ora from 'ora'

function createFolderAtLocation (location) {
  if (isAbsolute(location)) mkdirSync(location)
  else mkdirSync(join(__dirname, location))
}

export default function createProject (cliArgs) {
  const spinner = ora()
  spinner.color = 'cyan'
  spinner.text = 'Created folder at here.'
  spinner.start()
}
