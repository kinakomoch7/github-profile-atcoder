import { JSDOM } from "jsdom";
import * as d3 from "d3";
import { formatRateDataType } from "../../types/RateDataType";
import { CalcMaxLimitScore, CalcMaxScore } from "./calcScore";
import { RATE_HEIGHT, RATE_MARGIN, RATE_OUTLINE_COLOR, RATE_WIDTH } from "../../constants/styleConstants";
import determineTimeFormat from "./determineTimeFormat";
import determineTimeTicks from "./determineTimeTicks";
import determineColor from "./determineColor";
import { BG_COLOR_THEME } from "../../constants/constants";
import { DetermineGrade } from "./determineGrade";


const createRateChart = (data: formatRateDataType[], userName:string): string => {

  const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
  const container = d3.select(dom.window.document).select(".container");

  const svg = container
    .append("svg")
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr("width", RATE_WIDTH)
    .attr("height", RATE_HEIGHT)
    .attr('viewBox', `0 0 ${RATE_WIDTH} ${RATE_HEIGHT}`);

  // 白抜き
  svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", RATE_WIDTH)
    .attr("height", RATE_HEIGHT)
    .attr("fill", "rgb(255,255,255)");

  // 級を表示
  const level = DetermineGrade(data);
  svg.append("text")
    .attr("x", 50)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text(level);

  // ユーザ名を表示
  const highestRating = CalcMaxScore(data);
  svg.append("text")
    .attr("x", 200)
    .attr("y", 30)
    .attr("text-anchor", "end")
    .attr("font-size", "17px")
    .attr("fill", determineColor(highestRating))
    .text(userName);
  
  // グラフの背景
  svg.append("rect")
  .attr("x", RATE_MARGIN.left)
  .attr("y", RATE_MARGIN.top)
  .attr("width", RATE_WIDTH - RATE_MARGIN.left - RATE_MARGIN.right)
  .attr("height", RATE_HEIGHT - RATE_MARGIN.top - RATE_MARGIN.bottom)
  .attr("stroke", RATE_OUTLINE_COLOR)
  .attr("fill", "rgb(216,216,216)");


  // 軸の描画
  const minDate = d3.timeMonth.offset(d3.min(data, d => d.date) as Date, -1); // 最小値を1か月前に設定
  const maxDate = d3.timeMonth.offset(d3.max(data, d => d.date) as Date, 1); // 最大値に1か月分追加
  const x = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([RATE_MARGIN.left, RATE_WIDTH - RATE_MARGIN.right]);

  const maxScore = CalcMaxLimitScore(data) + 100; // 上に余白を持たせるため
  const y = d3.scaleLinear()
    .domain([0, maxScore]).nice()
    .range([RATE_HEIGHT - RATE_MARGIN.bottom, RATE_MARGIN.top]);

  // レートごとで背景色を変える
  const tickValues = d3.range(0, maxScore, 400);
  tickValues.forEach((domainValue, index) => {
    const nextValue = domainValue + 400;
    const rectHeight = index === tickValues.length-1 ? y(maxScore) - y(maxScore+100)  : y(domainValue) - y(nextValue);
    svg.append("rect")
      .attr("x", RATE_MARGIN.left)
      .attr("y",  index === tickValues.length-1 ? RATE_MARGIN.top : y(nextValue))
      .attr("width", RATE_WIDTH - RATE_MARGIN.left - RATE_MARGIN.right)
      .attr("height", rectHeight)
      .attr("fill", BG_COLOR_THEME[index]);
  });
  

  // Y軸
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${RATE_MARGIN.left}, 0)`)
    .call(d3.axisLeft(y)
          .tickValues(d3.range(0, maxScore, 400))
          .tickSize(0)
          .tickSizeOuter(0))
    .select(".domain")
    .attr("stroke", RATE_OUTLINE_COLOR);
  
  // Y軸の横線(グリッド)
  svg.selectAll(".y-axis .tick")
    .append("line")
    .attr("class", "y-grid-line")
    .attr("stroke", "rgb(230,230,230)") // 横線の色を指定
    .attr("x1", 0)
    .attr("x2", RATE_WIDTH - RATE_MARGIN.left - RATE_MARGIN.right)
    .attr("y1", 0)
    .attr("y2", 0);

  // X軸
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${RATE_HEIGHT - RATE_MARGIN.bottom})`)
    .call(d3.axisBottom(x)
          .ticks(determineTimeTicks(maxDate, x))
          .tickFormat((domainValue) => determineTimeFormat(domainValue))
          .tickSize(0)
          .tickSizeOuter(0))
    .select(".domain")
    .attr("stroke", RATE_OUTLINE_COLOR);

  // X軸の縦線(グリッド)
  svg.selectAll(".x-axis .tick")
    .append("line")
    .attr("class", "grid-line")
    .attr("stroke", "rgb(230,230,230)") // 縦線の色を指定
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", -RATE_HEIGHT + RATE_MARGIN.bottom + RATE_MARGIN.top
    );

  // データの描画
  const line = d3.line<formatRateDataType>()
  .x(d => x(d.date))
  .y(d => y(d.score));
  // 線
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "rgb(180, 180, 180)")
    .attr("stroke-width", 2)
    .attr("d", line)
  // 点
  svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.score))
    .attr("r", 4)
    .attr("fill", (d) => determineColor(d.score))
    .attr("stroke", "rgb(255,255,255)")
    .attr("stroke-width", 1);

  const svgString = container.html();
  return svgString;
};

export default createRateChart;
