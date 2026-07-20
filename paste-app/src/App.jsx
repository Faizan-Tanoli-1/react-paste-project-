import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
