import { useState } from "react";
import Barchart from "../graph/Barchart";
import { timeLine } from "../utils";
import LineChart from "../graph/Linechart";
const Order = () => {
  const links = [
    "http://localhost:5000/api/products/day",
    "http://localhost:5000/api/products/month",
    "http://localhost:5000/api/products/quater",
    "http://localhost:5000/api/products/year",
  ];
  const [dataLink, setDataLink] = useState(links[0]);
  const [dataLinkForLine, setDataLinkForLine] = useState(links[0]);

  return (
    <section className="order-page">
      <div className="order-page-wrapper">
        {/* first type of graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">Total Sales Over Time</h1>
          <div className="graph-content">
            <div>
              <div>
                <div className="btn-container">
                  <div>
                    {timeLine.map((time, index) => (
                      <button
                        className={`${
                          dataLink === links[index] ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => setDataLink(links[index])}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="graph-img-container">
                <Barchart link={dataLink} widthFromParent={700} />
              </div>
            </div>
          </div>
        </div>
        {/* second graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">Sales Growth Rate Over Time</h1>
          <div className="graph-content">
            <div>
              <div>
                <div className="btn-container">
                  <div>
                    {timeLine.map((time, index) => (
                      <button
                        className={`${
                          dataLinkForLine === links[index] ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => setDataLinkForLine(links[index])}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="graph-img-container">
                {/* graph place here */}
                {/* <img
                  src="https://cdn.corporatefinanceinstitute.com/assets/line-graph.jpg"
                  alt=""
                /> */}
                {/* localhost:5000/api/products/day */}
                <LineChart link={dataLinkForLine} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
