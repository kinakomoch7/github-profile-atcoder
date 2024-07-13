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
const JudgeAcTitle = (problemFullName, endTxt1, endTxt2) => {
    if (problemFullName.endsWith(endTxt1) || problemFullName.endsWith(endTxt2)) {
        return true;
    }
    return false;
};
const getAllProblemsCount = async () => {
    let [acCountA, acCountB, acCountC, acCountD, acCountE, acCountF, acCountG, acCount_H_Ex] = [0, 0, 0, 0, 0, 0, 0, 0];
    const [renameListC, renameListD] = (0, makeRenameList_1.default)();
    try {
        const response = await axios_1.default.get(`https://kenkoooo.com/atcoder/resources/problems.json`);
        const data = response.data;
        data.forEach((problem) => {
            if (problem.id.startsWith('abc')) {
                if (JudgeAcTitle(problem.id, 'a', '1')) {
                    acCountA++;
                }
                else if (JudgeAcTitle(problem.id, 'b', '2')) {
                    acCountB++;
                }
                else if (JudgeAcTitle(problem.id, 'c', '3')) {
                    acCountC++;
                }
                else if (JudgeAcTitle(problem.id, 'd', '4')) {
                    acCountD++;
                }
                else if (JudgeAcTitle(problem.id, 'e', '5')) {
                    acCountE++;
                }
                else if (JudgeAcTitle(problem.id, 'f', '6')) {
                    acCountF++;
                }
                else if (JudgeAcTitle(problem.id, 'g', '7')) {
                    acCountG++;
                }
                else if (JudgeAcTitle(problem.id, 'h', '8')) {
                    acCount_H_Ex++;
                }
            }
            else if (problem.id.startsWith('arc')) { //arcに変換されてる問題があるので作成してあるリストから探す
                if (renameListC.includes(problem.id)) {
                    acCountC++;
                }
                else if (renameListD.includes(problem.id)) {
                    acCountD++;
                }
            }
        });
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
exports.default = getAllProblemsCount;
