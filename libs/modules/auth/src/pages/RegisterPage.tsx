import { RouteComponent } from "@lana/core";
import { AuthModule } from "..";

export const RegisterPage: RouteComponent<AuthModule> = ({ path, module }) => {
  return (
    <div>
      <div>Register Page</div>
      <div>path: {path}</div>
      <div>auth type: {module.type}</div>
    </div>
  );
};
