import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CategoryPage from "./routes/CategoryPage.jsx";
import EntryPage from "./routes/EntryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
