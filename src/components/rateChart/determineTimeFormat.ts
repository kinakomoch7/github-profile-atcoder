import { NumberValue, timeFormat } from "d3";

const determineTimeFormat = (d: Date | NumberValue): string => {
  if (typeof d === 'number' || d instanceof Date) {
    // 数値の場合はDateオブジェクトに変換する
    const date = typeof d === 'number' ? new Date(d) : d;

    if (date.getDate() === 1 && date.getMonth() === 0) {
      return timeFormat("%b/%Y")(date);
    } else {
      return timeFormat("%b")(date);
    }
  }

  throw new Error("Invalid date format");
};

export default determineTimeFormat;
