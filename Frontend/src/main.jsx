import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "../src/Store/Store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cards } from "./Components/Cards Section/Cards.jsx";
import { CreateTeam } from "./Components/Team/CreateTeam.jsx";
import { AllTeams } from "./Components/Team/AllTeams.jsx";
import { IndividualTeam } from "./Components/Team/IndividualTeam.jsx";
import { Createuser } from "./Components/User/Createuser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Cards />,
      },
      {
        path: "/create-user",
        element: <Createuser />,
      },
      {
        path: "/create-team",
        element: <CreateTeam />,
      },
      {
        path: "/Teams",
        element: <AllTeams />,
      },
      {
        path: `/team-members/:teamId`,
        element: <IndividualTeam />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
