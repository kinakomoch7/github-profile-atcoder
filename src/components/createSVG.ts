import * as d3 from "d3";
import { JSDOM } from "jsdom";

export const createSVG = ():string => {
  // SVG環境を設定
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
  const body = d3.select(dom.window.document).select("body");

  // SVGコンテナを作成
  const width = 200;
  const height = 200;
  const svg = body.append("svg").attr("width", width).attr("height", height);

  // 四角形を描画
  svg
    .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "blue");

  // SVGを文字列として取得
  const svgString = body.html();

  return svgString;
  // SVG文字列を出力
  console.log(svgString);
};

// module.exports = createSVG;
