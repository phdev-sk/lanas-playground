import { ReactNode } from "react";
import { AnimateHeight } from "./AnimateHeight";

export interface ErrorMessageProps {
  message?: ReactNode;
  errorMessageProps?: any;
}

export const ErrorMessage = ({
  message,
  errorMessageProps,
}: ErrorMessageProps) => (
  <AnimateHeight isVisible={!!message}>
    {!!message && (
      <div className="pt-2">
        <div
          {...errorMessageProps}
          className="bg-red-200 dark:bg-red-500 text-red-500 dark:text-red-100 px-3 py-1 rounded"
        >
          {message}
        </div>
      </div>
    )}
  </AnimateHeight>
);
