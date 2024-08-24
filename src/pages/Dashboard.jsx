import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="dashboard-wrapper">
        <Sidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
