"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const determineColor = (score) => {
    if (score < 400) {
        return constants_1.CIRCLE_COLOR_THEME[0];
    }
    else if (score < 800) {
        return constants_1.CIRCLE_COLOR_THEME[1];
    }
    else if (score < 1200) {
        return constants_1.CIRCLE_COLOR_THEME[2];
    }
    else if (score < 1600) {
        return constants_1.CIRCLE_COLOR_THEME[3];
    }
    else if (score < 2000) {
        return constants_1.CIRCLE_COLOR_THEME[4];
    }
    else if (score < 2400) {
        return constants_1.CIRCLE_COLOR_THEME[5];
    }
    else if (score < 2800) {
        return constants_1.CIRCLE_COLOR_THEME[6];
    }
    else {
        return constants_1.CIRCLE_COLOR_THEME[7];
    }
};
exports.default = determineColor;
