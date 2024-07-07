import * as core from '@actions/core';
import axios from 'axios';
import { acCountType } from '../types/AcCountType';
import { submissionDataType } from '../types/SubmissionDataType';

type AcCountProps = {
  userName: string;
}

type JudgeAcTitleProps = {
  problemFullName: string;
  doneAcTitle: string[];
  endTxt1: string;
  endTxt2: string;
}
// problemFullNameがendTxt1またはendTxtで終わるかどうかを判定し、かつ重複していない場合にtrueを返す
const JudgeAcTitle = (props:JudgeAcTitleProps): boolean => {
  const { problemFullName, doneAcTitle, endTxt1, endTxt2 } = props;
  if (problemFullName.endsWith(endTxt1) || problemFullName.endsWith(endTxt2)) {
    if (!doneAcTitle.includes(problemFullName)) {
      return true;
    }
  }
  return false;
}

const getAcCount = async (props: AcCountProps): Promise<acCountType> => {
  const { userName } = props;

  let [acCountA, acCountB, acCountC, acCountD, acCountE ] = [0, 0, 0, 0, 0];
  const [doneAcTitleA, doneAcTitleB, doneAcTitleC, doneAcTitleD, doneAcTitleE]: string[][] = [[], [], [], [], []];

  try {
    let timeSecond = 0;

    while (true) {
      const response = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${timeSecond}`);
      const submissions: submissionDataType[] = response.data;

      if (submissions.length === 0) break;

      // 500件までのAC数を取得
      submissions.forEach((submission:submissionDataType) => {
        const problemFullName = submission.problem_id;

        // ABC問題のAC数を取得
        if (submission.result === 'AC' && problemFullName.startsWith('abc')) {
          if (JudgeAcTitle({ problemFullName, doneAcTitle: doneAcTitleA, endTxt1: 'a', endTxt2: '1' })) {
            acCountA++;
            doneAcTitleA.push(problemFullName);
          } else if (JudgeAcTitle({ problemFullName, doneAcTitle: doneAcTitleB, endTxt1: 'b', endTxt2: '2' })) {
            acCountB++;
            doneAcTitleB.push(problemFullName);
          } else if (JudgeAcTitle({ problemFullName, doneAcTitle: doneAcTitleC, endTxt1: 'c', endTxt2: '3' })) {
            acCountC++;
            doneAcTitleC.push(problemFullName);
          } else if (JudgeAcTitle({ problemFullName, doneAcTitle: doneAcTitleD, endTxt1: 'd', endTxt2: '4' })) {
            acCountD++;
            doneAcTitleD.push(problemFullName);
          } else if (JudgeAcTitle({ problemFullName, doneAcTitle: doneAcTitleE, endTxt1: 'e', endTxt2: '5' })) {
            acCountE++;
            doneAcTitleE.push(problemFullName);
          }
        } 
      })

      if (submissions.length < 500) break;
      timeSecond = submissions[submissions.length - 1].epoch_second + 1;
    }

  } catch (error) {
    core.setFailed('fetch error');
    throw error;
  }

  return {
    A: acCountA,
    B: acCountB,
    C: acCountC,
    D: acCountD,
    E: acCountE
  };
}

export default getAcCount;
