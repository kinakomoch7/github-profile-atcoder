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
exports.main = void 0;
const core = __importStar(require("@actions/core"));
const dotenv = __importStar(require("dotenv"));
const getRateData_1 = __importDefault(require("./api/getRateData"));
const writeFile_1 = __importDefault(require("./components/writeFile"));
const createRateChart_1 = __importDefault(require("./components/rateChart/createRateChart"));
const main = async () => {
    //環境変数の読み込み
    dotenv.config();
    try {
        // ユーザのtoken取得
        // const token = process.env.GITHUB_TOKEN;
        // if (!token) {
        //   core.setFailed('GITHUB_TOKEN is not set');
        //   return;
        // }
        // ユーザ名の取得
        const userName = (3 <= process.argv.length) ? process.argv[2] : process.env.USER_NAME;
        if (!userName) {
            core.setFailed('USERNAME is not set');
            return;
        }
        // // レートデータ取得
        const rateData = await (0, getRateData_1.default)({ userName });
        if (!rateData) {
            core.setFailed('rateData is not found');
            return;
        }
        console.log(rateData);
        (0, writeFile_1.default)('rate-chart.svg', (0, createRateChart_1.default)(rateData));
        // // // ABCのAC数取得
        // const AcCount = await getAcCount({ userName });
        // if (!AcCount) {
        //   core.setFailed('AcCount is not found');
        //   return;
        // }
        // const allProblemCount = await getAllProblemsCount();
        // if (!allProblemCount) {
        //   core.setFailed('allProblemCount is not found');
        //   return;
        // }
        // SVGを作成
        // writeFile('profile-svg.svg', createSVG());
    }
    catch (error) {
        console.error(error);
        core.setFailed("error");
    }
};
exports.main = main;
void (0, exports.main)();
