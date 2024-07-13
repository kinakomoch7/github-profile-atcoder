import { formatRateDataType } from "../types/RateDataType";

export const CalcMaxScore = (data: formatRateDataType[]): number => {

  let maxScore = 0;
  const dataMaxScore = data.reduce((max, current) => {return current.score > max ? current.score : max}, 0);
  if (dataMaxScore < 400) {
    maxScore = 400;
  } else if (dataMaxScore < 800) {
    maxScore = 800;
  }
  return maxScore;
}