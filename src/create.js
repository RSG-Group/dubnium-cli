import { mkdirSync, existsSync } from 'fs'
import { join, isAbsolute } from 'path'
import ora from 'ora'
import chalk from 'chalk'
import fetch from 'node-fetch'
import registryUrl from 'registry-url'

// Retruns an absolute path.
const getAbsolutePath = (location) => {
  // If path is absolute, return the original path.
  if (isAbsolute(location)) return location
  // Else return an absolute path of our making.
  else return join(process.cwd(), location)
}

// Create a folder at the specified location.
const createFolderAtLocation = (location) => mkdirSync(location)

// Verify if a package is on npm.
const verifyNpm = async (boilerplate) => {
  // Ask npm if it has such a package.
  const rawResultFromNpm = await fetch(registryUrl() + boilerplate)
  const parsedNpmRegistryEntry = await rawResultFromNpm.json() // Parse the response.
  // If package exists, string is npm, else invalid.
  if (Object.keys(parsedNpmRegistryEntry).includes('_id')) return 'npm'
  else return 'invalid'
}

// Verify if a repository is on GitHub.
const verifyGitHub = async (boilerplate) => {
  // Ask GitHub if it has such a repo.
  const rawResultFromGitHub = await fetch('https://api.github.com/repos/' + boilerplate)
  const parsedGithubEntry = await rawResultFromGitHub.json() // Parse the response.
  // If package exists, string is github, else invalid.
  if (Object.keys(parsedGithubEntry).includes('id')) return 'github'
  else return 'invalid'
}

// Identify the location where the boilerplate is located.
const identifyTypeOfBoilerplate = async (boilerplate, spinner) => {
  try {
    // Ask npm if it has such a package.
    spinner.color = 'green'
    spinner.text = 'Checking npm for boilerplate of the same name.'
    // If it is a valid package, return type as npm.
    if (await verifyNpm(boilerplate) === 'npm') return 'npm'
    // Ask GitHub if it has such a repo.
    spinner.color = 'yellow'
    spinner.text = 'Checking GitHub for a repository of the same name.'
    // If it is a valid repository, return github as type.
    if (await verifyGitHub(boilerplate) === 'github') return 'github'
    // Ask awesome-dubnium if they have a boilerplate like this.
    spinner.color = 'red'
    spinner.text = 'Checking Awesome Dubnium for a repository of the same name.'
    // If it is a valid boilerplate, return dubnium as type.
    // if (await verifyDubnium(boilerplate) === 'dubnium') return 'dubnium'
    // If no match found, return invalid.
    return 'invalid'
  } catch (e) { return 'invalid' }
}

// This handles the actual work by calling the individual functions.
export default async function createProject (cliArgs) {
  // We create a spinner.
  const spinner = ora().start()
  // Initialize it with what we're doing.
  spinner.color = 'cyan'
  spinner.text = 'Getting absolute path.'
  // Generate absolute path.
  const pathToFolder = getAbsolutePath(cliArgs.input[1])
  // If a file/folder exists at location already, we throw an error.
  if (existsSync(pathToFolder)) {
    spinner.stop()
    console.error(chalk.redBright.bold('A file/folder already exists at that location.'))
    return
  }
  // Else we create a folder there.
  spinner.color = 'grey'
  spinner.text = 'Creating folder at ' + cliArgs.input[1]
  try {
    createFolderAtLocation(pathToFolder)
  // But if we experienced an error, then we throw another error :p
  } catch (e) {
    spinner.stop()
    // If the directory in which we had to create the project doesn't exist.
    const errors = new Map([
      ['ENOENT', 'The directory in which the project was to be created does not exist.'],
      ['EACCES', 'The current user does not have permissions to access that directory.']
    ])
    // If we documented the error, then we log it, else we give a vague statement of what happened.
    if (errors.has(e.code)) console.log(chalk.redBright.bold(errors.get(e.code)))
    else console.log(chalk.redBright.bold('Could not create a directory at the specified path.'))
    return
  }
  // We now identify from where to fetch the boilerplate. By default we assume it is invalid.
  let fetchFrom = 'invalid'
  spinner.color = 'magenta'
  spinner.text = 'Verifying existence of specified boilerplate.'
  // If it is supposed to be a GitHub repository, then we verify it and then we know.
  if (cliArgs.flags.github || cliArgs.flags.gh) fetchFrom = await verifyGitHub(cliArgs.input[2])
  // or from Awesome Dubnium..
  // else if (cliArgs.flags.dubnium) fetchFrom = await verifyDubnium(cliArgs.input[2])
  else if (cliArgs.flags.npm) fetchFrom = await verifyNpm(cliArgs.input[2]) // or from npm..
  else fetchFrom = await identifyTypeOfBoilerplate(cliArgs.input[2], spinner)
  // If we couldn't find a match.
  if (fetchFrom === 'invalid') {
    spinner.stop()
    console.log(chalk.redBright.bold('Could not find the specified boilerplate.'))
    return
  }
  // We display the spinner.
  spinner.color = 'blue'
  const specified = fetchFrom === 'dubnium' ? 'Awesome Dubnium'
    : fetchFrom === 'github' ? 'GitHub' : fetchFrom
  spinner.text = 'Fetching boilerplate ' + cliArgs.input[2] + ' from ' + specified
  // We fetch the boilerplate to /tmp/boilerplate
}
