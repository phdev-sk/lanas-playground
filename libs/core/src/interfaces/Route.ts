import { FC } from "react";
import { Module } from "./Module";

export interface RouteComponentProps<T> {
  path: string;
  module: T;
}

export type RouteComponent<T> = FC<RouteComponentProps<T>>;

export interface Route<T extends Module<T>> {
  path: string;
  component: RouteComponent<T>;
}
