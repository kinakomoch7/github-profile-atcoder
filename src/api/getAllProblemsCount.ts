import * as core from '@actions/core';
import axios from 'axios';
import makeRenameList from './makeRenameList';
import { AbcProblemType } from '../types/AbcProblemType';


const JudgeAcTitle = (problemFullName: string, endTxt1: string, endTxt2: string): boolean => {
  if (problemFullName.endsWith(endTxt1) || problemFullName.endsWith(endTxt2)) {
    return true;
  }
  return false;
}


const getAllProblemsCount = async (): Promise<AbcProblemType> => {

  let [acCountA, acCountB, acCountC, acCountD, acCountE, acCountF, acCountG, acCount_H_Ex ] = [0, 0, 0, 0, 0, 0, 0, 0];
  const [ renameListC, renameListD ] = makeRenameList();

  try {
    const response = await axios.get(`https://kenkoooo.com/atcoder/resources/problems.json`);
    const data = response.data;
    
    data.forEach((problem: any) => {
      if (problem.id.startsWith('abc')) {

        if(JudgeAcTitle(problem.id, 'a', '1')) {
          acCountA++;
        } else if(JudgeAcTitle(problem.id, 'b', '2')) {
          acCountB++;
        } else if(JudgeAcTitle(problem.id, 'c', '3')) {
          acCountC++;
        } else if(JudgeAcTitle(problem.id, 'd', '4' )) {
          acCountD++;
        } else if(JudgeAcTitle(problem.id, 'e', '5' )) {
          acCountE++;
        } else if(JudgeAcTitle(problem.id, 'f', '6')) {
          acCountF++;
        } else if(JudgeAcTitle(problem.id, 'g', '7')) {
          acCountG++;
        } else if(JudgeAcTitle(problem.id, 'h', '8')) {
          acCount_H_Ex++;
        }

      } else if (problem.id.startsWith('arc')) { //arcに変換されてる問題があるので作成してあるリストから探す
        if (renameListC.includes(problem.id)) {
          acCountC++;
        } else if (renameListD.includes(problem.id)) {
          acCountD++;
        }
      }
    })

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

export default getAllProblemsCount;
