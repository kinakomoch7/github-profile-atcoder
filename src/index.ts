import * as core from "@actions/core";
import * as dotenv from "dotenv";
import getRateData from "./api/getRateData";
import getAcCount from "./api/getAcCount";
import getAllProblemsCount from "./api/getAllProblemsCount";
import writeFile from "./components/writeFile";
import createSVG from "./components/createSVG";
import createRateChart from "./components/rateChart/createRateChart";

export const main = async (): Promise<void> => {
  //環境変数の読み込み
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

    // // レートデータ取得
    const rateData = await getRateData({ userName });
    if (!rateData) {
      core.setFailed('rateData is not found');
      return;
    }

    writeFile('rate-chart.svg', createRateChart(rateData, userName));

    // // // ABCのAC数取得
    // const AcCount = await getAcCount({ userName });
    // if (!AcCount) {
    //   core.setFailed('AcCount is not found');
    //   return;
    // }

    // const allProblemCount = await getAllProblemsCount();
    // if (!allProblemCount) {
    //   core.setFailed('allProblemCount is not found');
    //   return;
    // }

    // SVGを作成
    // writeFile('profile-svg.svg', createSVG());


  } catch (error) {
    console.error(error);
    core.setFailed("error");
  }
};

void main();