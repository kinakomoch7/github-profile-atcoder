import * as core from '@actions/core';
import * as dotenv from 'dotenv';
import getRateData from './api/getRateData';
import getAcCount from './api/getAcCount';


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

    // レートデータ取得
    const data = await getRateData({ userName });

    // ABCのAC数取得
    const AcCount = await getAcCount({ userName });
    console.log(AcCount);


  } catch (error) {
    console.error(error);
    core.setFailed('error');
  }
}

void main();
