/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getRandomColor } from "../utils";

// eslint-disable-next-line react/prop-types
const CustomerBarchart = ({ link, widthFromParent, isGeo = false }) => {
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
    let cityMap;
    let x;
    let y;
    d3.json(link).then(function (data) {
      if (!isGeo) {
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

        y = d3
          .scaleLinear()
          .domain([0, d3.max(data.customers, (d) => d.count)])
          .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        svg
          .selectAll("mybar")
          .data(data.customers)
          .join("rect")
          .attr("x", (d) => x(months[d._id.month - 1] + "-" + d._id.year))
          .attr("y", (d) => y(d.count))
          .attr("width", x.bandwidth())
          .attr("height", (d) => height - y(d.count))
          .attr("fill", () => getRandomColor(colors))
          .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "red");

            svg
              .append("text")
              .attr(
                "x",
                x(months[d._id.month - 1] + "-" + d._id.year) +
                  x.bandwidth() / 2
              )
              .attr("y", y(d.totalSales) - 10)
              .attr("text-anchor", "middle")
              .text(Math.round(d.count))
              .attr("fill", "#fff")
              .attr("font-size", "15px")
              .attr("font-weight", "bold");
          })
          .on("mouseout", function (event, d) {
            d3.select(this).attr("fill", getRandomColor(colors));
            svg.selectAll("text").remove();
            svg.append("g").call(d3.axisLeft(y));

            svg
              .append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");
          });
      } else {
        cityMap = data.customerCity.reduce((map, item) => {
          map[item._id] = item._id;
          return map;
        }, {});

        x = d3
          .scaleBand()
          .range([0, width])
          .domain(data.customerCity.map((d) => cityMap[d._id]))
          .padding(0.2);
        svg
          .append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        y = d3
          .scaleLinear()
          .domain([0, d3.max(data.customerCity, (d) => d.count)])
          .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        svg
          .selectAll("mybar")
          .data(data.customerCity)
          .join("rect")
          .attr("x", (d) => x(cityMap[d._id]))
          .attr("y", (d) => y(d.count))
          .attr("width", x.bandwidth())
          .attr("height", (d) => height - y(d.count))
          .attr("fill", () => getRandomColor(colors))
          .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "red");
            svg
              .append("text")
              .attr("x", x(cityMap[d._id]))
              .attr("y", y(d.totalSales) - 10)
              .attr("text-anchor", "middle")
              .text(Math.round(d.count))
              .attr("fill", "#fff")
              .attr("font-size", "15px")
              .attr("font-weight", "bold");
          })
          .on("mouseout", function (event, d) {
            d3.select(this).attr("fill", getRandomColor(colors));
            d3.select(this).attr("fill", getRandomColor(colors));
            svg.selectAll("text").remove();
            svg.append("g").call(d3.axisLeft(y));

            svg
              .append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  return <svg width={widthFromParent} height={400} id="barchart" ref={ref} />;
};

export default CustomerBarchart;
