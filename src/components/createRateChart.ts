import { JSDOM } from "jsdom";
import * as d3 from "d3";
import { formatRateDataType } from "../types/RateDataType";
import { CalcMaxScore } from "./calcScore";
import { RATE_HEIGHT, RATE_MARGIN, RATE_OUTLINE_COLOR, RATE_WIDTH } from "../constants/styleConstants";


const createRateChart = (data: formatRateDataType[]): string => {

  const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
  const container = d3.select(dom.window.document).select(".container");


  const svg = container.append("svg")
    .attr("width", RATE_WIDTH)
    .attr("height", RATE_HEIGHT);

  svg.append("rect")
  .attr("x", RATE_MARGIN.left)
  .attr("y", RATE_MARGIN.top)
  .attr("width", RATE_WIDTH - RATE_MARGIN.left - RATE_MARGIN.right)
  .attr("height", RATE_HEIGHT - RATE_MARGIN.top - RATE_MARGIN.bottom)
  .attr("stroke", RATE_OUTLINE_COLOR)
  .attr("fill", "rgb(216,216,216)");

  const minDate = d3.timeMonth.offset(d3.min(data, d => d.date) as Date, -1); // 最小値を1か月前に設定
  const maxDate = d3.timeMonth.offset(d3.max(data, d => d.date) as Date, 1); // 最大値に1か月分追加
  const x = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([RATE_MARGIN.left, RATE_WIDTH - RATE_MARGIN.right]);

  const maxScore = CalcMaxScore(data);
  const y = d3.scaleLinear()
    .domain([0, maxScore]).nice()
    .range([RATE_HEIGHT - RATE_MARGIN.bottom, RATE_MARGIN.top]);

  const line = d3.line<formatRateDataType>()
    .x(d => x(d.date))
    .y(d => y(d.score));

  svg.append("g")
    .attr("transform", `translate(0,${RATE_HEIGHT - RATE_MARGIN.bottom})`)
    .call(d3.axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickSize(0)
          .tickSizeOuter(0))
    .select(".domain")
    .attr("stroke", RATE_OUTLINE_COLOR);
  
  svg.selectAll(".tick")
    .append("line")
    .attr("class", "grid-line")
    .attr("stroke", "rgb(230,230,230)") // 縦線の色を指定
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", -RATE_HEIGHT + RATE_MARGIN.bottom + RATE_MARGIN.top
    );


  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "rgb(180, 180, 180)")
    .attr("stroke-width", 2)
    .attr("d", line)


  svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.score))
    .attr("r", 4)
    .attr("fill", "rgb(125,125,125)")
    .attr("stroke", "rgb(255,255,255)")
    .attr("stroke-width", 1);

  svg.append("text")
    .attr("x", x(data[data.length - 1].date))
    .attr("dy", "-1em")
    .attr("text-anchor", "middle")
    .text(`Highest: ${d3.max(data, d => d.score)}`)
    .attr("fill", "black");

  const svgString = container.html();
  return svgString;
};

export default createRateChart;