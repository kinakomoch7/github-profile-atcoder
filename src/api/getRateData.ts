import * as core from '@actions/core';
import axios from 'axios';

type Props = {
  userName: string;
}

// AtCoderのレートデータを取得する
const getRateData = async (props: Props): Promise<any> => {
  const { userName } = props;

  console.log(userName)

  try {
    const response = await axios.get(`https://atcoder.jp/users/${userName}/history/json`);
    const data = response.data;
    return data;

  } catch (error) {
    core.setFailed('fetch error');
    throw error;
  }
}

export default getRateData;
