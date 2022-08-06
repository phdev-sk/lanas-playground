import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createLana } from "@lana/core";
import { AuthModule } from "@lana/auth-module";

const Lana = createLana({
  modules: [new AuthModule({ type: "cookie" })],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Lana />
  </React.StrictMode>,
);
