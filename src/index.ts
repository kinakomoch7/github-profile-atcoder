import * as core from "@actions/core";
import * as dotenv from "dotenv";
import getRateData from "./api/getRateData";
import getAcCount from "./api/getAcCount";
import getAllProblemsCount from "./api/getAllProblemsCount";
// const createSVG = require('./components/createSVG')
import * as create from "./components/createSVG";
import * as f from "./components/filewrite";

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

    // // // レートデータ取得
    const rateData = await getRateData({ userName });
    console.log(rateData);

    // // ABCのAC数取得
    const AcCount = await getAcCount({ userName });
    console.log(AcCount);

    // const allProblemCount = await getAllProblemsCount();
    // console.log(allProblemCount);

    /* const test = create.createSVG();
    f.writeFile('profile-svg', create.createSVG());
    console.log(test); */
  } catch (error) {
    console.error(error);
    core.setFailed("error");
  }
};

void main();