import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getRandomColor } from "../utils";

// eslint-disable-next-line react/prop-types
const Barchart = ({ link, widthFromParent, isQuater, isMonth }) => {
  const ref = useRef();
  const colors = ["#2185C5"];
  console.log("Barchart link", link);
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
    let x;
    const quater = ["Q1", "Q2", "Q3", "Q4"];
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
      if (isQuater) {
        console.log("quater", quater);
        x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.products.map(
              (d) => quater[d._id.quater - 1] + "-" + d._id.year
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
            data.products.map((d) => months[d._id.month - 1] + "-" + d._id.year)
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
          .domain(data.products.map((d) => d._id))
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
        .domain([0, d3.max(data.products, (d) => d.totalSales)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(data.products)
        .join("rect")
        .attr("x", (d) =>
          isQuater
            ? x(quater[d._id.quater - 1] + "-" + d._id.year)
            : isMonth
            ? x(months[d._id.month - 1] + "-" + d._id.year)
            : x(d._id)
        )
        .attr("y", (d) => y(d.totalSales))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.totalSales))
        .attr("fill", getRandomColor(colors))
        .on("mouseover", function (event, d) {
          console.log("d", d.totalSales, event);
          d3.select(this).attr("fill", "red");
          svg
            .append("text")
            .attr("x", x(d._id) + x.bandwidth() / 2)
            .attr("y", y(d.totalSales) - 10)
            .attr("text-anchor", "middle")
            .text(Math.round(d.totalSales))
            .attr("fill", "#fff")
            .attr("font-size", "15px")
            .attr("font-weight", "bold");
        })
        // eslint-disable-next-line no-unused-vars
        .on("mouseout", function (event, d) {
          d3.select(this).attr("fill", getRandomColor(colors));
          svg.selectAll("text").remove();
          // above line also remove the text of x-axis so we need to add it again
          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

          svg.append("g").call(d3.axisLeft(y));
        });
    });
  }, [link]);

  return <svg width={1000} height={400} id="barchart" ref={ref} />;
};

export default Barchart;
