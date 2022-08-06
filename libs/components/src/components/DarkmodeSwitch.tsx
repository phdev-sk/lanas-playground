import { useMemo, useRef } from "react";
import { useCheckbox, VisuallyHidden } from "react-aria";
import { useToggleState, ToggleProps } from "react-stately";
import { Focus } from "./Focus";
import { Sun, Moon } from "react-feather";
import { motion } from "framer-motion";
import cx from "classnames";
import { useDarkMode } from "../hooks/useDarkmode";

export const DarkmodeSwitch = () => {
  const [isDarkmode, setDarkmode] = useDarkMode();

  const controlledProps: ToggleProps = useMemo(
    () => ({
      children: "Darkmode",
      isSelected: isDarkmode,
      onChange: setDarkmode,
    }),
    [isDarkmode],
  );

  const { children } = controlledProps;

  const ref = useRef<HTMLInputElement>(null);

  const state = useToggleState(controlledProps);
  const { inputProps } = useCheckbox(controlledProps, state, ref);

  const isSelected = state.isSelected;

  return (
    <Focus focusClassName="bg-slate-100 shadow-slate-100 dark:bg-slate-800 dark:shadow-slate-800 rounded-full">
      <label className="flex gap-2 items-center">
        <VisuallyHidden>
          <input {...inputProps} ref={ref} />
        </VisuallyHidden>
        <div
          className={cx(
            "w-[56px] h-10 rounded-full shrink-0 flex items-center p-1 text-white bg-white border dark:border-slate-700 dark:bg-slate-800",
          )}
        >
          <motion.div
            className="bg-white border dark:border-slate-700 dark:bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center"
            animate={{ x: isSelected ? 16 : 0 }}
          >
            {isDarkmode ? (
              <Moon className="text-slate-100" size={18} />
            ) : (
              <Sun className="text-slate-500" size={18} />
            )}
          </motion.div>
        </div>
        <VisuallyHidden>
          <div>{children}</div>
        </VisuallyHidden>
      </label>
    </Focus>
  );
};
