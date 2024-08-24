import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getRandomColor } from "../utils";

// eslint-disable-next-line react/prop-types
const Barchart = ({ link, widthFromParent }) => {
  const ref = useRef();
  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
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

    d3.json(link).then(function (data) {
      console.log(data);

      const x = d3
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

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data.products, (d) => d.totalSales)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(data.products)
        .join("rect")
        .attr("x", (d) => x(d._id))
        .attr("y", (d) => y(d.totalSales))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.totalSales))
        .attr("fill", getRandomColor(colors));
    });
  }, [link]);

  return <svg width={1000} height={400} id="barchart" ref={ref} />;
};

export default Barchart;
