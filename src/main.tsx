import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PostsList from "./PostsList";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root não encontrado");

ReactDOM.createRoot(rootEl as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      {/* Primeiro o gerenciador */}
      <App />

      {/* Depois a lista de posts salvos */}
      <h2 className="h2">Posts salvos</h2>
      <PostsList />
    </div>
  </React.StrictMode>
);
