import d3 from "d3";
import { formatRateDataType } from "../types/RateDataType";

export const CalcMaxScore = (data: formatRateDataType[]): number => {
  let maxScore = 0;
  if (d3.max(data, d => d.score) as number < 400) {
    maxScore = 400;
  } else if (d3.max(data, d => d.score) as number < 800) {
    maxScore = 800;
  }
  return maxScore;
}