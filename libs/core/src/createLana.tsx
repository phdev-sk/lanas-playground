import { FC } from "react";
import { Module } from "./interfaces/Module";
import { Lana } from "./components/Lana";

export interface CreateLanaOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modules: Module<any>[];
}

export const createLana = ({ modules }: CreateLanaOptions): FC<unknown> => {
  const LanaInstance = () => {
    return <Lana modules={modules} />;
  };
  return LanaInstance;
};
