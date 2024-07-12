export type rateDataType = {
  IsRated: boolean,
  Place: number,
  OldRating: number,
  NewRating: number,
  Performance: number,
  InnerPerformance: number,
  ContestScreenName: string,
  ContestName: string,
  ContestNameEn?: string,
  EndTime: string
};

export type formatRateDataType = {
  date: Date,
  score: number
};