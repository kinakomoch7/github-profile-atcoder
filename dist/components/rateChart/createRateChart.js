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
const jsdom_1 = require("jsdom");
const d3 = __importStar(require("d3"));
const calcScore_1 = require("./calcScore");
const styleConstants_1 = require("../../constants/styleConstants");
const determineTimeFormat_1 = __importDefault(require("./determineTimeFormat"));
const determineTimeTicks_1 = __importDefault(require("./determineTimeTicks"));
const determineColor_1 = __importDefault(require("./determineColor"));
const constants_1 = require("../../constants/constants");
const createRateChart = (data) => {
    const dom = new jsdom_1.JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
    const container = d3.select(dom.window.document).select(".container");
    const svg = container
        .append("svg")
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", styleConstants_1.RATE_WIDTH)
        .attr("height", styleConstants_1.RATE_HEIGHT)
        .attr('viewBox', `0 0 ${styleConstants_1.RATE_WIDTH} ${styleConstants_1.RATE_HEIGHT}`);
    // 白抜き
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", styleConstants_1.RATE_WIDTH)
        .attr("height", styleConstants_1.RATE_HEIGHT)
        .attr("fill", "rgb(255,255,255)");
    // グラフの背景
    svg.append("rect")
        .attr("x", styleConstants_1.RATE_MARGIN.left)
        .attr("y", styleConstants_1.RATE_MARGIN.top)
        .attr("width", styleConstants_1.RATE_WIDTH - styleConstants_1.RATE_MARGIN.left - styleConstants_1.RATE_MARGIN.right)
        .attr("height", styleConstants_1.RATE_HEIGHT - styleConstants_1.RATE_MARGIN.top - styleConstants_1.RATE_MARGIN.bottom)
        .attr("stroke", styleConstants_1.RATE_OUTLINE_COLOR)
        .attr("fill", "rgb(216,216,216)");
    // 軸の描画
    const minDate = d3.timeMonth.offset(d3.min(data, d => d.date), -1); // 最小値を1か月前に設定
    const maxDate = d3.timeMonth.offset(d3.max(data, d => d.date), 1); // 最大値に1か月分追加
    const x = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([styleConstants_1.RATE_MARGIN.left, styleConstants_1.RATE_WIDTH - styleConstants_1.RATE_MARGIN.right]);
    const maxScore = (0, calcScore_1.CalcMaxScore)(data) + 100; // 上に余白を持たせるため
    const y = d3.scaleLinear()
        .domain([0, maxScore]).nice()
        .range([styleConstants_1.RATE_HEIGHT - styleConstants_1.RATE_MARGIN.bottom, styleConstants_1.RATE_MARGIN.top]);
    // レートごとで背景色を変える
    const tickValues = d3.range(0, maxScore, 400);
    tickValues.forEach((domainValue, index) => {
        const nextValue = domainValue + 400;
        const rectHeight = index === tickValues.length - 1 ? y(maxScore) - y(maxScore + 100) : y(domainValue) - y(nextValue);
        svg.append("rect")
            .attr("x", styleConstants_1.RATE_MARGIN.left)
            .attr("y", index === tickValues.length - 1 ? styleConstants_1.RATE_MARGIN.top : y(nextValue))
            .attr("width", styleConstants_1.RATE_WIDTH - styleConstants_1.RATE_MARGIN.left - styleConstants_1.RATE_MARGIN.right)
            .attr("height", rectHeight)
            .attr("fill", constants_1.BG_COLOR_THEME[index]);
    });
    // Y軸
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${styleConstants_1.RATE_MARGIN.left}, 0)`)
        .call(d3.axisLeft(y)
        .tickValues(d3.range(0, maxScore, 400))
        .tickSize(0)
        .tickSizeOuter(0))
        .select(".domain")
        .attr("stroke", styleConstants_1.RATE_OUTLINE_COLOR);
    // Y軸の横線(グリッド)
    svg.selectAll(".y-axis .tick")
        .append("line")
        .attr("class", "y-grid-line")
        .attr("stroke", "rgb(230,230,230)") // 横線の色を指定
        .attr("x1", 0)
        .attr("x2", styleConstants_1.RATE_WIDTH - styleConstants_1.RATE_MARGIN.left - styleConstants_1.RATE_MARGIN.right)
        .attr("y1", 0)
        .attr("y2", 0);
    // X軸
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${styleConstants_1.RATE_HEIGHT - styleConstants_1.RATE_MARGIN.bottom})`)
        .call(d3.axisBottom(x)
        .ticks((0, determineTimeTicks_1.default)(maxDate, x))
        .tickFormat((domainValue) => (0, determineTimeFormat_1.default)(domainValue))
        .tickSize(0)
        .tickSizeOuter(0))
        .select(".domain")
        .attr("stroke", styleConstants_1.RATE_OUTLINE_COLOR);
    // X軸の縦線(グリッド)
    svg.selectAll(".x-axis .tick")
        .append("line")
        .attr("class", "grid-line")
        .attr("stroke", "rgb(230,230,230)") // 縦線の色を指定
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", -styleConstants_1.RATE_HEIGHT + styleConstants_1.RATE_MARGIN.bottom + styleConstants_1.RATE_MARGIN.top);
    // データの描画
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.score));
    // 線
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgb(180, 180, 180)")
        .attr("stroke-width", 2)
        .attr("d", line);
    // 点
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.score))
        .attr("r", 4)
        .attr("fill", (d) => (0, determineColor_1.default)(d.score))
        .attr("stroke", "rgb(255,255,255)")
        .attr("stroke-width", 1);
    const svgString = container.html();
    return svgString;
};
exports.default = createRateChart;
