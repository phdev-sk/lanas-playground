import { ChangeEvent, useRef } from "react";
import { useCheckbox, VisuallyHidden } from "react-aria";
import { useToggleState, ToggleProps } from "react-stately";
import { Focus } from "./Focus";
import { Check } from "react-feather";
import { motion } from "framer-motion";
import cx from "classnames";

export interface CheckboxProps extends ToggleProps {
  onFormikChange?: (e: ChangeEvent) => void;
}

export const Checkbox = (props: CheckboxProps) => {
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
          ? "focus-within:bg-slate-200/70 focus-within:shadow-slate-200/70 dark:focus-within:bg-slate-700/70 dark:focus-within:shadow-slate-700/70"
          : undefined,
      )}
    >
      <label className="flex gap-2">
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
            "w-6 h-6 transition-all rounded shrink-0 flex items-center justify-center text-white",
            isSelected ? "bg-primary" : "bg-slate-300 dark:bg-slate-600",
          )}
        >
          <motion.div animate={{ scale: isSelected ? 1 : 0 }}>
            <Check size={16} />
          </motion.div>
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
