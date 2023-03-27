import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PetsContextProvider } from "./context/PetsContext";
import { PlaydatesContextProvider } from "./context/PlaydatesContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PlaydatesContextProvider>
        <PetsContextProvider>
          <App />
        </PetsContextProvider>
      </PlaydatesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
