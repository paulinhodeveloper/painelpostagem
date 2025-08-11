import React from "react";
import PostsList from "./PostsList";
import App from "./App";

export default function Layout() {
  return (
    <div style={{ maxWidth: 980, margin: "24px auto" }}>
      {/* POSTS SALVOS (sempre primeiro) */}
      <h2 style={{ margin: "0 0 12px" }}>Posts salvos</h2>
      <PostsList />

      <hr style={{ border: 0, height: 1, background: "#e5e7eb", margin: "28px 0" }} />

      {/* GERENCIADOR (formulário) */}
      <App />
    </div>
  );
}
