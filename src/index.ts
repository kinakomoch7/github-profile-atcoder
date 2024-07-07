import * as core from '@actions/core';
import * as dotenv from 'dotenv';
import getRateData from './api/getRateData';


export const main = async (): Promise<void> => {

  dotenv.config();

  try {
    // ユーザのtoken取得
    // const token = process.env.GITHUB_TOKEN;
    // if (!token) {
    //   core.setFailed('GITHUB_TOKEN is not set');
    //   return;
    // }

    // ユーザ名の取得
    const userName = (3 <= process.argv.length) ? process.argv[2] : process.env.USER_NAME;
    if (!userName) {
      core.setFailed('USERNAME is not set');
      return;
    }

    // データ取得
    const data = await getRateData({ userName });

    console.log(data); // 取得データのログ

  } catch (error) {
    console.error(error);
    core.setFailed('error');
  }
}

void main();
