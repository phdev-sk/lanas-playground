import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { Focus } from "./Focus";
import cx from "classnames";

export const Button = (props: AriaButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(props, ref);
  const { children, isDisabled } = props;

  return (
    <Focus>
      <button
        ref={ref}
        {...buttonProps}
        className={cx(
          "flex w-full items-center h-10 bg-primary text-white font-bold text-sm uppercase justify-center gap-2 transition-all",
          {
            "opacity-50": isDisabled,
          },
          isPressed ? "bg-primary-600" : "bg-primary",
        )}
      >
        {children}
      </button>
    </Focus>
  );
};
