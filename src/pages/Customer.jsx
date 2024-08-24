import { useState } from "react";
import CustomerBarchart from "../graph/CustomerBarchart";
import { timeLine } from "../utils";
import RepeatedCustBarchart from "../graph/RepeatedCustomer";
const Customer = () => {
  const links = [
    // "http://localhost:5000/api/customers/new-customer",
    // "http://localhost:5000/api/new-customer/month",
    // "http://localhost:5000/api/customers/quater",
    // "http://localhost:5000/api/customers/year",
    // `${import.meta.env.VITE_API_URL_PROD}/api/customers/new-customer`,
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/new-customer`,
  ];

  const linksForSecondGraph = [
    // "http://localhost:5000/api/customers/repeat-customer/day",
    // "http://localhost:5000/api/customers/repeat-customer/month",
    // "http://localhost:5000/api/customers/repeat-customer/quater",
    // "http://localhost:5000/api/customers/repeat-customer/year",
    // `${import.meta.env.VITE_API_URL_PROD}/api/customers/repeat-customer/day`,
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/repeat-customer/day`,
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/repeat-customer/month`,
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/repeat-customer/quater`,
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/repeat-customer/year`,
  ];

  const geoChart = `${
    import.meta.env.VITE_API_URL_PROD
  }/api/customers/customer-city`;

  const [dataLinkForLine, setDataLinkForLine] = useState(
    linksForSecondGraph[0]
  );

  return (
    <section className="order-page">
      <div className="order-page-wrapper">
        {/* first type of graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">New Customers Added Over Time</h1>
          <div className="graph-content">
            <div>
              <div className="graph-img-container">
                <CustomerBarchart link={links[0]} widthFromParent={900} />
              </div>
            </div>
          </div>
        </div>
        {/* second graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">Number of Repeat Customers</h1>
          <div className="graph-content">
            <div>
              <div>
                <div className="btn-container">
                  <div>
                    {timeLine.map((time, index) => (
                      <button
                        className={`${
                          dataLinkForLine === linksForSecondGraph[index]
                            ? "active"
                            : ""
                        }`}
                        key={index}
                        onClick={() =>
                          setDataLinkForLine(linksForSecondGraph[index])
                        }
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="graph-img-container">
                <RepeatedCustBarchart
                  link={dataLinkForLine}
                  isDay={dataLinkForLine === linksForSecondGraph[0]}
                  isMonth={dataLinkForLine === linksForSecondGraph[1]}
                  isQuater={dataLinkForLine === linksForSecondGraph[2]}
                  isYear={dataLinkForLine === linksForSecondGraph[3]}
                  widthFromParent={900}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Third graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">
            Geographical Distribution of Customers:
          </h1>
          <div className="graph-content">
            <div>
              <div className="graph-img-container">
                <CustomerBarchart
                  link={geoChart}
                  widthFromParent={1200}
                  isGeo={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
