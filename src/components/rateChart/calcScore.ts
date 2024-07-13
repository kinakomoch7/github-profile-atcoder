import { formatRateDataType } from "../../types/RateDataType";

export const CalcMaxScore = (data: formatRateDataType[]): number => {

  let maxScore = 0;
  const dataMaxScore = data.reduce((max, current) => {return current.score > max ? current.score : max}, 0);
  if (dataMaxScore < 400) {
    maxScore = 400;
  } else if (dataMaxScore < 800) {
    maxScore = 800;
  } else if (dataMaxScore < 1200) {
    maxScore = 1200;
  } else if (dataMaxScore < 1600) {
    maxScore = 1600;
  } else if (dataMaxScore < 2000) {
    maxScore = 2000;
  } else if (dataMaxScore < 2400) {
    maxScore = 2400;
  } else if (dataMaxScore < 2800) {
    maxScore = 2800;
  }
  return maxScore;
}