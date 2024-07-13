"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_time_1 = require("d3-time");
const determineTimeTicks = (maxDate, x) => {
    const timeDiff = d3_time_1.timeMonth.count(x.domain()[0], maxDate);
    if (timeDiff <= 6) {
        return d3_time_1.timeMonth.every(1); // 6ヶ月以下の場合は1か月おき
    }
    else if (timeDiff <= 24) {
        return d3_time_1.timeMonth.every(2); // 2年以下の場合は2ヶ月おき
    }
    else {
        return d3_time_1.timeMonth.every(6); // それ以上は6ヶ月おき
    }
};
exports.default = determineTimeTicks;
