import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";           
import PostsList from "./PostsList"; 
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root não encontrado no index.html");

ReactDOM.createRoot(rootEl as HTMLElement).render(
  <React.StrictMode>
    <div style={{ maxWidth: 980, margin: "24px auto" }}>
      <PostsList />

      <hr style={{ border: 0, height: 1, background: "#e5e7eb", margin: "28px 0" }} />

      <App />
    </div>
  </React.StrictMode>
);
