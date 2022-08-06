import { ReactNode } from "react";
import cx from "classnames";

export interface FieldProps {
  children?: ReactNode;
  isError?: boolean;
}

export const Field = ({ children, isError = false }: FieldProps) => {
  return (
    <div
      className={cx(
        "w-full relative bg-white dark:bg-slate-800 h-10 rounded border-2 dark:border-slate-700 overflow-hidden",
        isError
          ? "border-red-500 dark:border-red-600"
          : "focus-within:border-primary dark:focus-within:border-primary",
      )}
    >
      {children}
    </div>
  );
};
