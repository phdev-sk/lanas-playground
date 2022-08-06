import { ReactNode } from "react";
import cx from "classnames";

export interface ProviderProps {
  children?: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <div
      className={cx(
        "w-full h-full selection:bg-primary selection:text-white text-slate-700 dark:text-slate-200",
      )}
    >
      {children}
    </div>
  );
};
