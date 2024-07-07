import * as core from '@actions/core';

const main = async() : Promise<void> => {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      core.setFailed('GITHUB_TOKEN is not set')
    }
    
  } catch (error) {
    console.error(error)
    core.setFailed('error')
  }
}

export default main