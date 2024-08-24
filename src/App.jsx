import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "./routes/index";
function App() {
  console.log(router);
  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
