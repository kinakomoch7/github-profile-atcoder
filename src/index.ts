import * as core from '@actions/core';

const main = async() : Promise<void> => {
  try {

    // ユーザのtoken取得
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      core.setFailed('GITHUB_TOKEN is not set')
      return
    }

    // ユーザ名の取得
    const userName = 3 <= process.argv.length ? process.argv[2] : process.env.USERNAME;
    if (!userName) {
      core.setFailed('USERNAME is not set')
      return
    }

  } catch (error) {
    console.error(error)
    core.setFailed('error')
  }
}

export default main