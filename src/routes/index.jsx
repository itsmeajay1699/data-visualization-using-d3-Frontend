import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import Customer from "../pages/Customer";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<>NOT FOUND</>}>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<Order />} />
        <Route path="/customer" element={<Customer />} />
      </Route>
    </Route>
  )
);

export default router;
