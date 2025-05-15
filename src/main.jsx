import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CategoryPage from "./routes/CategoryPage.jsx";
import EntryPage from "./routes/EntryPage.jsx";
import GroupPage from "./routes/GroupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "/category/:targetGroup",
    element: <GroupPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
