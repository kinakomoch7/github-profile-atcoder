import { JSDOM } from "jsdom";
import * as d3 from "d3";
import { AbcProblemType } from "../../types/AbcProblemType";
import { AC_HEIGHT, AC_MARGIN, AC_WIDTH} from "../../constants/styleConstants";

const createAcChart = (acCount: AbcProblemType, allProblemCount: AbcProblemType) => {

  const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
  const container = d3.select(dom.window.document).select(".container");

  const svgW = AC_WIDTH * 4;
  const svgH = AC_HEIGHT * 2;

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

      const centerX = (AC_WIDTH - AC_MARGIN.left - AC_MARGIN.right) / 2 + col * AC_WIDTH;
      const centerY = (AC_HEIGHT - AC_MARGIN.top - AC_MARGIN.bottom) / 2 + row * AC_HEIGHT;

      const index = row * 4 + col;
      let level;
      if (index === 0) {
        level = 'A';
      } else if (index === 1) {
        level = 'B';
      } else if (index === 2) {
        level = 'C';
      } else if (index === 3) {
        level = 'D';
      } else if (index === 4) {
        level = 'E';
      } else if (index === 5) {
        level = 'F';
      } else if (index === 6) {
        level = 'G';
      } else if (index === 7) {
        level = 'H_Ex';
      }

      svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", (AC_HEIGHT - AC_MARGIN.top - AC_MARGIN.bottom) / 2)
      .attr("class", "all-problem")
      .attr("fill", "gray")
      // .attr("stroke", "black")
      // .attr("stroke-width", 1);

      const proportion = acCount[level as keyof AbcProblemType] / allProblemCount[level as keyof AbcProblemType];

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius((AC_HEIGHT - AC_MARGIN.top - AC_MARGIN.bottom) / 2)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI / 2 - proportion * 2 * Math.PI);

      svg.append("path")
        .attr("d", arc as any)
        .attr("fill", "rgb(50,205,50)")
        .attr("transform", `translate(${centerX}, ${centerY})`);

      svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", (AC_HEIGHT - AC_MARGIN.top - AC_MARGIN.bottom) / 3)
        .attr("fill", "white");

      svg.append("text")
        .attr("x", centerX)
        .attr("y", centerY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "20px")
        .text(`AC: ${acCount[level as keyof AbcProblemType]} / ${allProblemCount[level as keyof AbcProblemType]}`);

        svg.append("text")
        .attr("x", centerX)
        .attr("y", centerY + AC_HEIGHT / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "20px")
        .text(`Problem ${level}`);

    }
  }

  const svgString = container.html();
  return svgString;
}

export default createAcChart