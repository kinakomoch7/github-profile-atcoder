"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const makeRenameList = () => {
    const CList = [];
    const DList = [];
    constants_1.RenameContestList.forEach((contest) => {
        const key = Object.keys(contest)[0];
        if (contest[key].C) {
            CList.push(contest[key].C);
        }
        if (contest[key].D) {
            DList.push(contest[key].D);
        }
    });
    return [CList, DList];
};
exports.default = makeRenameList;
