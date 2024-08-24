/* eslint-disable react/prop-types */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getRandomColor } from "../utils";

// eslint-disable-next-line react/prop-types
const LineChart = ({
  link,
  widthFromParent = 600,
  // isDay,
  isQuarter,
  isMonth,
}) => {
  const ref = useRef();
  const colors = ["#2185C5"];
  useEffect(() => {
    // Define margins and dimensions
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = widthFromParent - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Clear any existing SVG elements
    d3.select(ref.current).selectAll("*").remove();

    // Append SVG and group element
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    let x;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const quatertNames = ["Q1", "Q2", "Q3", "Q4"];
    // Fetch and process data
    d3.json(link)
      .then((data) => {
        // Access the array within the data object
        const salesData = data.products;

        // Define the x-axis scale

        if (isMonth) {
          // If `_id` represents months, map to month names
          x = d3
            .scaleBand()
            .range([0, width])
            .domain(
              data.products.map(
                (d) => months[d._id.month - 1] + "-" + d._id.year
              )
            )
            .padding(0.2);
          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        } else if (isQuarter) {
          // If `_id` represents months, map to month names
          x = d3
            .scaleBand()
            .range([0, width])
            .domain(
              data.products.map(
                (d) => quatertNames[d._id.quater - 1] + "-" + d._id.year
              )
            )
            .padding(0.2);
          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        } else {
          x = d3
            .scalePoint()
            .domain(salesData.map((d) => d._id))
            .range([0, width])
            .padding(0.5);

          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        }

        // Define the y-axis scale
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(salesData, (d) => d.totalSales)])
          .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Define the line generator
        const line = d3
          .line()
          .x((d) =>
            isQuarter
              ? x(quatertNames[d._id.quater - 1] + "-" + d._id.year)
              : isMonth
              ? x(months[d._id.month - 1] + "-" + d._id.year)
              : x(d._id)
          )
          .y((d) => y(d.totalSales))
          .curve(d3.curveMonotoneX); // Smooth curve

        // Append the line path
        svg
          .append("path")
          .datum(salesData)
          .attr("fill", "none")
          .attr("stroke", getRandomColor(colors))
          .attr("stroke-width", 2)
          .attr("d", line);

        // Optional: Add circles at data points
        svg
          .selectAll("circle")
          .data(salesData)
          .enter()
          .append("circle")
          .attr("cx", (d) => 
            isQuarter
              ? x(quatertNames[d._id.quater - 1] + "-" + d._id.year)
              : isMonth
              ? x(months[d._id.month - 1] + "-" + d._id.year)
              : x(d._id)
          )
          .attr("cy", (d) => y(d.totalSales))
          .attr("r", 4)
          .attr("fill", getRandomColor(colors));
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  }, [link, widthFromParent]); // Re-run effect when `link` or `widthFromParent` changes

  return <div ref={ref}></div>;
};

export default LineChart;
