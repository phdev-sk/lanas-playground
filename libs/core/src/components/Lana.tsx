import {
  BrowserRouter,
  Route as ReactRoute,
  Routes as ReactRoutes,
} from "react-router-dom";
import { Module } from "../interfaces";
import { Homepage } from "./Homepage";
import { Provider } from "@lana/components";

export interface ILanaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modules: Module<any>[];
}

export const Lana = ({ modules }: ILanaProps) => {
  return (
    <Provider>
      <BrowserRouter>
        <ReactRoutes>
          <ReactRoute path={"/"} element={<Homepage />} />
          {modules.map((module) =>
            module
              .getRoutes()
              .map(({ path, component: Component }) => (
                <ReactRoute
                  key={path}
                  path={path}
                  element={<Component module={module} path={path} />}
                />
              )),
          )}
        </ReactRoutes>
      </BrowserRouter>
    </Provider>
  );
};
