"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
const makeRenameList_1 = __importDefault(require("./makeRenameList"));
// problemFullNameがendTxt1またはendTxtで終わるかどうかを判定し、かつ重複していないかを判定
const isEndingAndUnique = (problemFullName, doneAcTitle, endTxt1, endTxt2) => {
    if (problemFullName.endsWith(endTxt1) || problemFullName.endsWith(endTxt2)) {
        if (!doneAcTitle.includes(problemFullName)) {
            return true;
        }
    }
    return false;
};
const getAcCount = async (props) => {
    const { userName } = props;
    let [acCountA, acCountB, acCountC, acCountD, acCountE, acCountF, acCountG, acCount_H_Ex] = [0, 0, 0, 0, 0, 0, 0, 0];
    const [doneAcTitleA, doneAcTitleB, doneAcTitleC, doneAcTitleD, doneAcTitleE, doneAcTitleF, doneAcTitleG, doneAcTitle_H_Ex] = [[], [], [], [], [], [], [], []];
    const [renameListC, renameListD] = (0, makeRenameList_1.default)();
    try {
        let timeSecond = 0;
        while (true) {
            const response = await axios_1.default.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userName}&from_second=${timeSecond}`);
            const submissions = response.data;
            if (submissions.length === 0)
                break;
            // 500件までのAC数を取得
            submissions.forEach((submission) => {
                const problemFullName = submission.problem_id;
                // ABC問題のAC数を取得
                if (submission.result === 'AC') {
                    if (problemFullName.startsWith('abc')) {
                        // A~Hの9種類を判定
                        for (let index = 0; index < 9; index++) {
                            if (isEndingAndUnique(problemFullName, doneAcTitleA, String.fromCharCode(97 + index), String(index + 1))) {
                                (index === 0) && acCountA++;
                                doneAcTitleA.push(problemFullName);
                                (index === 1) && acCountB++;
                                doneAcTitleB.push(problemFullName);
                                (index === 2) && acCountC++;
                                doneAcTitleC.push(problemFullName);
                                (index === 3) && acCountD++;
                                doneAcTitleD.push(problemFullName);
                                (index === 4) && acCountE++;
                                doneAcTitleE.push(problemFullName);
                                (index === 5) && acCountF++;
                                doneAcTitleF.push(problemFullName);
                                (index === 6) && acCountG++;
                                doneAcTitleG.push(problemFullName);
                                (index === 7) && acCount_H_Ex++;
                                doneAcTitle_H_Ex.push(problemFullName);
                            }
                        }
                    }
                    else if (problemFullName.startsWith('arc')) { //arcに変換されてる問題があるので作成してあるリストから探す
                        if (renameListC.includes(problemFullName) && !doneAcTitleC.includes(problemFullName)) {
                            acCountC++;
                            doneAcTitleC.push(problemFullName);
                        }
                        else if (renameListD.includes(problemFullName) && !doneAcTitleD.includes(problemFullName)) {
                            acCountD++;
                            doneAcTitleD.push(problemFullName);
                        }
                    }
                }
            });
            // 500件以上の場合は次の500件を取得するため探索を始める時間を更新。500件未満の場合は終了
            if (submissions.length < 500)
                break;
            timeSecond = submissions[submissions.length - 1].epoch_second + 1;
        }
    }
    catch (error) {
        core.setFailed('fetch error');
        throw error;
    }
    return {
        A: acCountA,
        B: acCountB,
        C: acCountC,
        D: acCountD,
        E: acCountE,
        F: acCountF,
        G: acCountG,
        H_Ex: acCount_H_Ex
    };
};
exports.default = getAcCount;
