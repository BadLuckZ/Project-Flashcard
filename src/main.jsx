import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CategoryPage from "./routes/CategoryPage.jsx";
import EntryPage from "./routes/EntryPage.jsx";
import DeckPage from "./routes/DeckPage.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

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
    path: "/category/:deckParam",
    element: <DeckPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>
);
