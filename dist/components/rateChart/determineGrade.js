"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetermineGrade = void 0;
const calcScore_1 = require("./calcScore");
const DetermineGrade = (data) => {
    const highestRating = (0, calcScore_1.CalcMaxScore)(data);
    if (highestRating < 2) {
        return "20級";
    }
    else if (highestRating < 3) {
        return "19級";
    }
    else if (highestRating < 5) {
        return "18級";
    }
    else if (highestRating < 8) {
        return "17級";
    }
    else if (highestRating < 13) {
        return "16級";
    }
    else if (highestRating < 20) {
        return "15級";
    }
    else if (highestRating < 33) {
        return "14級";
    }
    else if (highestRating < 54) {
        return "13級";
    }
    else if (highestRating < 90) {
        return "12級";
    }
    else if (highestRating < 147) {
        return "11級";
    }
    else if (highestRating < 243) {
        return "10級";
    }
    else if (highestRating < 400) {
        return "9級";
    }
    else if (highestRating < 600) {
        return "8級";
    }
    else if (highestRating < 800) {
        return "7級";
    }
    else if (highestRating < 1000) {
        return "6級";
    }
    else if (highestRating < 1200) {
        return "5級";
    }
    else if (highestRating < 1400) {
        return "4級";
    }
    else if (highestRating < 1600) {
        return "3級";
    }
    else if (highestRating < 1800) {
        return "2級";
    }
    else if (highestRating < 2000) {
        return "1級";
    }
    else if (highestRating < 2200) {
        return "初段";
    }
    else if (highestRating < 2400) {
        return "二段";
    }
    else if (highestRating < 2600) {
        return "三段";
    }
    else if (highestRating < 2800) {
        return "四段";
    }
    else if (highestRating < 3000) {
        return "五段";
    }
    else if (highestRating < 3200) {
        return "六段";
    }
    else if (highestRating < 3400) {
        return "七段";
    }
    else if (highestRating < 3600) {
        return "八段";
    }
    else if (highestRating < 3800) {
        return "九段";
    }
    else if (highestRating < 4000) {
        return "十段";
    }
    else if (highestRating < 4200) {
        return "皆伝";
    }
    else if (highestRating < 4400) {
        return "極伝";
    }
    else {
        return "??";
    }
};
exports.DetermineGrade = DetermineGrade;
