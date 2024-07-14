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
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const d3 = __importStar(require("d3"));
const styleConstants_1 = require("../../constants/styleConstants");
const createAcChart = (acCount, allProblemCount) => {
    const dom = new jsdom_1.JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
    const container = d3.select(dom.window.document).select(".container");
    const svgW = styleConstants_1.AC_WIDTH * 4;
    const svgH = styleConstants_1.AC_HEIGHT * 2;
    const svg = container
        .append("svg")
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", svgW)
        .attr("height", svgH)
        .attr('viewBox', `0 0 ${svgW} ${svgH}`);
    // 白抜き
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", svgW)
        .attr("height", svgH)
        .attr("fill", "rgb(255,255,255)");
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            const centerX = (styleConstants_1.AC_WIDTH - styleConstants_1.AC_MARGIN.left - styleConstants_1.AC_MARGIN.right) / 2 + col * styleConstants_1.AC_WIDTH;
            const centerY = (styleConstants_1.AC_HEIGHT - styleConstants_1.AC_MARGIN.top - styleConstants_1.AC_MARGIN.bottom) / 2 + row * styleConstants_1.AC_HEIGHT;
            const index = row * 4 + col;
            let level;
            if (index === 0) {
                level = 'A';
            }
            else if (index === 1) {
                level = 'B';
            }
            else if (index === 2) {
                level = 'C';
            }
            else if (index === 3) {
                level = 'D';
            }
            else if (index === 4) {
                level = 'E';
            }
            else if (index === 5) {
                level = 'F';
            }
            else if (index === 6) {
                level = 'G';
            }
            else if (index === 7) {
                level = 'H_Ex';
            }
            svg.append("circle")
                .attr("cx", centerX)
                .attr("cy", centerY)
                .attr("r", (styleConstants_1.AC_HEIGHT - styleConstants_1.AC_MARGIN.top - styleConstants_1.AC_MARGIN.bottom) / 2)
                .attr("class", "all-problem")
                .attr("fill", "gray");
            // .attr("stroke", "black")
            // .attr("stroke-width", 1);
            const proportion = acCount[level] / allProblemCount[level];
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius((styleConstants_1.AC_HEIGHT - styleConstants_1.AC_MARGIN.top - styleConstants_1.AC_MARGIN.bottom) / 2)
                .startAngle(Math.PI / 2)
                .endAngle(Math.PI / 2 - proportion * 2 * Math.PI);
            svg.append("path")
                .attr("d", arc)
                .attr("fill", "rgb(50,205,50)")
                .attr("transform", `translate(${centerX}, ${centerY})`);
            svg.append("circle")
                .attr("cx", centerX)
                .attr("cy", centerY)
                .attr("r", (styleConstants_1.AC_HEIGHT - styleConstants_1.AC_MARGIN.top - styleConstants_1.AC_MARGIN.bottom) / 3)
                .attr("fill", "white");
            svg.append("text")
                .attr("x", centerX)
                .attr("y", centerY)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "20px")
                .text(`AC: ${acCount[level]} / ${allProblemCount[level]}`);
            svg.append("text")
                .attr("x", centerX)
                .attr("y", centerY + styleConstants_1.AC_HEIGHT / 2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "20px")
                .text(`Problem ${level}`);
        }
    }
    const svgString = container.html();
    return svgString;
};
exports.default = createAcChart;
