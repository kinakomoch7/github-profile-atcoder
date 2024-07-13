import { timeMonth } from "d3-time";

const determineTimeTicks = (maxDate: Date, x: d3.ScaleTime<number, number, never>) => {

  const timeDiff = timeMonth.count(x.domain()[0], maxDate);

  if (timeDiff <= 6) {
    return timeMonth.every(1); // 6ヶ月以下の場合は1か月おき
  } else if (timeDiff <= 24) {
    return timeMonth.every(2); // 2年以下の場合は2ヶ月おき
  } else {
    return timeMonth.every(6); // それ以上は6ヶ月おき
  }
}

export default determineTimeTicks;