import { ReactElement } from "react";
import cx from "classnames";
import { FocusRing } from "react-aria";

export interface FocusProps {
  children: ReactElement<any, string>;
  isError?: boolean;
  focusClassName?: string;
  className?: string;
}

export const Focus = ({
  children,
  isError = false,
  focusClassName,
  className,
}: FocusProps) => {
  return (
    <FocusRing
      within
      focusRingClass={cx(
        "shadow-focus",
        isError
          ? "bg-red-500/20 shadow-red-500/20"
          : focusClassName
          ? focusClassName
          : "bg-primary/20 shadow-primary/20",
        className,
      )}
    >
      <div className={cx("group w-full transition-all", className)}>
        {children}
      </div>
    </FocusRing>
  );
};
