import { Module } from "@lana/core";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import "./utils/i18n";

type AuthType = "cookie" | "session" | "jwt";

export interface AuthModuleOptions {
  type: AuthType;
}

export class AuthModule implements Module<AuthModule> {
  type: AuthType;

  constructor({ type }: AuthModuleOptions) {
    this.type = type;
  }

  getRoutes = () => {
    return [
      {
        path: "/login",
        component: LoginPage,
      },
      {
        path: "/register",
        component: RegisterPage,
      },
    ];
  };
}
