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
const createSVG = () => {
    // 仮想DOMを作成
    const dom = new jsdom_1.JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
    const container = d3.select(dom.window.document).select(".container");
    const width = 200;
    const height = 200;
    const svg = container.append("svg").attr("width", width).attr("height", height);
    svg
        .append("rect")
        .attr("x", 50)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "blue");
    const svgString = container.html();
    return svgString;
};
exports.default = createSVG;
