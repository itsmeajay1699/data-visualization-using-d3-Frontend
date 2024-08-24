import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
const SidebarItems = [
  {
    title: "Order",
    url: "/",
  },
  {
    title: "Customer",
    url: "/customer",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <h1>Rapid Quest</h1>
        <div className="sidebar-items">
          {SidebarItems.map((item, index) => (
            <Link
              className={path === item.url ? "active" : ""}
              key={index}
              to={item.url}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
