import { Route } from "./Route";

export interface Module<T extends Module<T>> {
  getRoutes: () => Route<T>[];
}
