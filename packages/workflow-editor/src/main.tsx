import "src/globals.css";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "src/App";

const container = document.getElementById("root");

createRoot(container!).render(
  <React.StrictMode>
    <div style={{ width: "99.2vw", height: "100vh" }}>
      <App />
    </div>
  </React.StrictMode>
);
