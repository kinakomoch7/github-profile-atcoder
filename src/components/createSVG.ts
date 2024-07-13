import { JSDOM } from "jsdom";
import * as d3 from "d3";


const createSVG = ():string => {

  // 仮想DOMを作成
  const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
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

export default createSVG;