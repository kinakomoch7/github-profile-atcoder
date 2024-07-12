import * as core from '@actions/core';
import axios from 'axios';
import { formatRateDataType, rateDataType } from '../types/RateDataType';

type Props = {
  userName: string;
}

const getRateData = async (props: Props): Promise<formatRateDataType[]> => {
  const { userName } = props;

  try {
    const response = await axios.get(`https://atcoder.jp/users/${userName}/history/json`);
    const data = response.data;

    const rateData = data.filter((item: rateDataType) => item.IsRated === true);
    const formattedRateData = rateData.map((item: rateDataType) => {
      return {
        date: new Date(item.EndTime),
        score: item.NewRating,
      };
    });

    return formattedRateData;

  } catch (error) {
    core.setFailed('fetch error');
    throw error;
  }
}

export default getRateData;
