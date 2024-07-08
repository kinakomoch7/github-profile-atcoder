import * as core from '@actions/core';
import axios from 'axios';
import { AbcProblemType } from '../types/AbcProblemType';
import { submissionDataType } from '../types/SubmissionDataType';
import makeRenameList from './makeRenameList';

type AcCountProps = {
  userName: string;
}

// problemFullNameがendTxt1またはendTxtで終わるかどうかを判定し、かつ重複していないかを判定
const isEndingAndUnique = (problemFullName: string, doneAcTitle: string[], endTxt1: string, endTxt2:string): boolean => {

  if (problemFullName.endsWith(endTxt1) || problemFullName.endsWith(endTxt2)) {
    if (!doneAcTitle.includes(problemFullName)) {
      return true;
    }
  }
  return false;
}

const getAcCount = async (props: AcCountProps): Promise<AbcProblemType> => {
  const { userName } = props;

  let [acCountA, acCountB, acCountC, acCountD, acCountE, acCountF, acCountG, acCount_H_Ex ]:number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  const [doneAcTitleA, doneAcTitleB, doneAcTitleC, doneAcTitleD, doneAcTitleE, doneAcTitleF, doneAcTitleG, doneAcTitle_H_Ex]: string[][] = [[], [], [], [], [], [], [], []];
  const [ renameListC, renameListD ] = makeRenameList()

  try {
    let timeSecond:number = 0;

    while (true) {
      const response = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${timeSecond}`);
      const submissions: submissionDataType[] = response.data;

      if (submissions.length === 0) break;

      // 500件までのAC数を取得
      submissions.forEach((submission:submissionDataType) => {
        const problemFullName = submission.problem_id;

        // ABC問題のAC数を取得
        if (submission.result === 'AC' ){
          if(problemFullName.startsWith('abc')) {

            // A~Hの9種類を判定
            for(let index = 0; index < 9; index++) {
              if (isEndingAndUnique( problemFullName, doneAcTitleA, String.fromCharCode(97 + index), String(index + 1) )) {
                
                (index === 0)  && acCountA++; doneAcTitleA.push(problemFullName);
                (index === 1)  && acCountB++; doneAcTitleB.push(problemFullName);
                (index === 2)  && acCountC++; doneAcTitleC.push(problemFullName);
                (index === 3)  && acCountD++; doneAcTitleD.push(problemFullName);
                (index === 4)  && acCountE++; doneAcTitleE.push(problemFullName);
                (index === 5)  && acCountF++; doneAcTitleF.push(problemFullName);
                (index === 6)  && acCountG++; doneAcTitleG.push(problemFullName);
                (index === 7)  && acCount_H_Ex++; doneAcTitle_H_Ex.push(problemFullName);
                
              }
            }

          } else if (problemFullName.startsWith('arc')) { //arcに変換されてる問題があるので作成してあるリストから探す

            if (renameListC.includes(problemFullName) && !doneAcTitleC.includes(problemFullName)) {
              acCountC++;
              doneAcTitleC.push(problemFullName);
            } else if (renameListD.includes(problemFullName) && !doneAcTitleD.includes(problemFullName)) {
              acCountD++;
              doneAcTitleD.push(problemFullName);
            }

          }
        }
      })

      // 500件以上の場合は次の500件を取得するため探索を始める時間を更新。500件未満の場合は終了
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
    E: acCountE,
    F: acCountF,
    G: acCountG,
    H_Ex: acCount_H_Ex
  };
}

export default getAcCount;
