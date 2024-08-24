import CustomerBarchart from "../graph/CustomerBarchart";
const Customer = () => {
  const links = [
    // "http://localhost:5000/api/customers/new-customer",
    // "http://localhost:5000/api/new-customer/month",
    // "http://localhost:5000/api/customers/quater",
    // "http://localhost:5000/api/customers/year",
    `${import.meta.env.VITE_API_URL_PROD}/api/customers/new-customer`,
  ];

  // const [dataLinkForLine, setDataLinkForLine] = useState(links[0]);

  return (
    <section className="order-page">
      <div className="order-page-wrapper">
        {/* first type of graph */}
        <div className="order-page-content">
          <h1 className="graph-heading">New Customers Added Over Time</h1>
          <div className="graph-content">
            <div>
              {/* <div>
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
              </div> */}
              <div className="graph-img-container">
                <CustomerBarchart link={links[0]} widthFromParent={900} />
              </div>
            </div>
          </div>
        </div>
        {/* second graph */}
        {/* <div className="order-page-content">
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
                <LineChart link={dataLinkForLine} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Customer;
