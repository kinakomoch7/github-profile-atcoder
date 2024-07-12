import { JSDOM } from "jsdom";
import * as d3 from "d3";
import { formatRateDataType } from "../types/RateDataType";
import { CalcMaxScore } from "./calcScore";




const createRateChart = (data: formatRateDataType[]): string => {

  const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
  const container = d3.select(dom.window.document).select(".container");

  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("rect")
  .attr("x", margin.left)
  .attr("y", margin.top)
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("stroke", "rgb(155,155,155)")
  .attr("fill", "rgb(216,216,216)");

  const minDate = d3.timeMonth.offset(d3.min(data, d => d.date) as Date, -1); // 最小値を1か月前に設定
  const maxDate = d3.timeMonth.offset(d3.max(data, d => d.date) as Date, 1); // 最大値に1か月分追加
  const x = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([margin.left, width - margin.right]);


  const maxScore = CalcMaxScore(data);
  const y = d3.scaleLinear()
    .domain([0, maxScore]).nice()
    .range([height - margin.bottom, margin.top]);

  const line = d3.line<formatRateDataType>()
    .x(d => x(d.date))
    .y(d => y(d.score));

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickSize(0).tickSizeOuter(0))


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
