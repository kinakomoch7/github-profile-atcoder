import { formatRateDataType } from "../../types/RateDataType";

export const CalcMaxLimitScore = (data: formatRateDataType[]): number => {

  let maxLimitScore = 0;
  const dataMaxScore =  CalcMaxScore(data);
  if (dataMaxScore < 400) {
    maxLimitScore = 400;
  } else if (dataMaxScore < 800) {
    maxLimitScore = 800;
  } else if (dataMaxScore < 1200) {
    maxLimitScore = 1200;
  } else if (dataMaxScore < 1600) {
    maxLimitScore = 1600;
  } else if (dataMaxScore < 2000) {
    maxLimitScore = 2000;
  } else if (dataMaxScore < 2400) {
    maxLimitScore = 2400;
  } else if (dataMaxScore < 2800) {
    maxLimitScore = 2800;
  }
  return maxLimitScore;
}

export const CalcMaxScore = (data: formatRateDataType[]): number => {
  return data.reduce((max, current) => {return current.score > max ? current.score : max}, 0);
}
