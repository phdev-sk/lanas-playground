import { ChangeEvent, useRef } from "react";
import { useCheckbox, VisuallyHidden } from "react-aria";
import { useToggleState, ToggleProps } from "react-stately";
import { Focus } from "./Focus";
import { Check } from "react-feather";
import { motion } from "framer-motion";
import cx from "classnames";

export interface SwitchProps extends ToggleProps {
  onFormikChange?: (e: ChangeEvent) => void;
}

export const Switch = (props: SwitchProps) => {
  const { children, onFormikChange } = props;

  const ref = useRef<HTMLInputElement>(null);

  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);
  const { onChange } = inputProps;

  const isSelected = state.isSelected;

  return (
    <Focus
      focusClassName={cx(
        !isSelected
          ? "focus-within:bg-slate-200/70 focus-within:shadow-slate-200/70"
          : undefined,
      )}
    >
      <label className="flex gap-2 items-center">
        <VisuallyHidden>
          <input
            {...inputProps}
            onChange={(e) => {
              onChange && onChange(e);
              onFormikChange && onFormikChange(e);
            }}
            ref={ref}
          />
        </VisuallyHidden>
        <div
          className={cx(
            "w-12 h-8 transition-all rounded-full shrink-0 flex items-center p-1 text-white",
            isSelected ? "bg-primary" : "bg-slate-300 dark:bg-slate-600",
          )}
        >
          <motion.div
            className="bg-white rounded-full w-6 h-6"
            animate={{ x: isSelected ? 16 : 0 }}
          ></motion.div>
        </div>
        <div
          className={cx("flex select-none", {
            "text-primary": isSelected,
          })}
        >
          {children}
        </div>
      </label>
    </Focus>
  );
};
