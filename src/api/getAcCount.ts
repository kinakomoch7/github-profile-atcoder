import * as core from '@actions/core';
import axios from 'axios';
import { acCountType } from '../types/AcCountType';

type Props = {
  userName: string;
}

const getAcCount = async (props: Props): Promise<acCountType> => {

  const { userName } = props;

  let acCountA = 0;
  let acCountB = 0;
  let acCountC = 0;
  let acCountD = 0;
  let acCountE = 0;

  try {

    let timeSecond = 0;

    while (true) {
      const response = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${timeSecond}`);
      // 500件目のときデータないのでbreak
      if (response.data.length === 0) break;

      for(let i = 0; i < response.data.length; i++) {
        const problemFullName = response.data[i].problem_id;

        // ACかつABCの問題のみカウント
        if (response.data[i].result === 'AC' && problemFullName.startsWith('abc')) {

          problemFullName.endsWith('a') && acCountA++;
          problemFullName.endsWith('b') && acCountB++;
          problemFullName.endsWith('c') && acCountC++;
          problemFullName.endsWith('d') && acCountD++;
          problemFullName.endsWith('e') && acCountE++;

        }
      }
      
      // 最大件数500件なので最大に達したらbreak
      if (response.data.length < 500) break;
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
