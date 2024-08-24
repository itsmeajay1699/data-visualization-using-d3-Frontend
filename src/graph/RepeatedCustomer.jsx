/* eslint-disable react/prop-types */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getRandomColor } from "../utils";

const RepeatedCustBarchart = ({
  link,
  widthFromParent = 900,
  isDay,
  isMonth,
  isQuater,
  // isYear,
}) => {
  const ref = useRef();
  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = widthFromParent - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    d3.json(link).then(function (data) {
      console.log(data);
      let x;

      if (isDay) {
        x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.customers.map(
              (d) =>
                d._id.day + "-" + months[d._id.month - 1] + "-" + d._id.year
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
      } else if (isMonth) {
        x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.customers.map(
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
      } else if (isQuater) {
        const quaters = ["Q1", "Q2", "Q3", "Q4"];

        x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.customers.map(
              (d) => quaters[d._id.quarter - 1] + "-" + d._id.year
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
          .scaleBand()
          .range([0, width])
          .domain(data.customers.map((d) => d._id.year))
          .padding(0.2);
        svg
          .append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
      }

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data.customers, (d) => d.repeatCustomers)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(data.customers)
        .join("rect")
        .attr("x", (d) =>
          isDay
            ? x(d._id.day + "-" + months[d._id.month - 1] + "-" + d._id.year)
            : isMonth
            ? x(months[d._id.month - 1] + "-" + d._id.year)
            : isQuater
            ? x("Q" + d._id.quarter + "-" + d._id.year)
            : x(d._id.year)
        )
        .attr("y", (d) => y(d.repeatCustomers))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.repeatCustomers))
        .attr("fill", getRandomColor(colors));
    });
  }, [link]);

  return <svg width={1000} height={400} id="barchart" ref={ref} />;
};

export default RepeatedCustBarchart;
