"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_1 = require("d3");
const determineTimeFormat = (d) => {
    if (typeof d === 'number' || d instanceof Date) {
        // 数値の場合はDateオブジェクトに変換する
        const date = typeof d === 'number' ? new Date(d) : d;
        if (date.getDate() === 1 && date.getMonth() === 0) {
            return (0, d3_1.timeFormat)("%b/%Y")(date);
        }
        else {
            return (0, d3_1.timeFormat)("%b")(date);
        }
    }
    throw new Error("Invalid date format");
};
exports.default = determineTimeFormat;
