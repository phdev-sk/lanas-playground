import { Field } from "./Field";
import { Focus } from "./Focus";
import cx from "classnames";
import { useState, useRef, useMemo, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { AnimateHeight } from "./AnimateHeight";
import { useTextField, AriaTextFieldProps, useFocus } from "react-aria";
import { ErrorMessage } from "./ErrorMessage";

export interface InputProps extends AriaTextFieldProps {
  onFormikChange?: (e: ChangeEvent) => void;
}

export const Input = (props: InputProps) => {
  const { label, errorMessage, value, onFormikChange } = props;

  const ref = useRef<HTMLInputElement>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  const { onChange } = inputProps;

  const [isFocused, setFocused] = useState(false);

  const isLabelMovedUp = useMemo(
    () => isFocused || !!value,
    [isFocused, value],
  );

  const { focusProps } = useFocus({
    onFocusChange: (isFocus) => setFocused(isFocus),
  });

  const isError = useMemo(() => !!errorMessage, [errorMessage]);

  return (
    <div className="flex flex-col">
      <Focus isError={isError}>
        <div className="relative">
          {label && (
            <motion.label
              initial={{
                y: 10,
              }}
              animate={{
                y: isLabelMovedUp ? -13 : 10,
              }}
              className={cx(
                "absolute text-sm font-semibold z-10 left-[14px] px-1 bg-white dark:bg-slate-800 top-0 select-none pointer-events-none",
                isError
                  ? "text-red-500"
                  : isFocused
                  ? "text-primary"
                  : "text-slate-500 dark:text-slate-400",
              )}
            >
              <label {...labelProps}>{label}</label>
            </motion.label>
          )}
          <Field isError={isError}>
            <input
              {...inputProps}
              {...focusProps}
              onChange={(e) => {
                onChange && onChange(e);
                onFormikChange && onFormikChange(e);
              }}
              ref={ref}
              className="w-full h-full px-3 bg-transparent"
            />
          </Field>
          <ErrorMessage
            errorMessageProps={errorMessageProps}
            message={errorMessage}
          />
        </div>
      </Focus>
      {props.description && (
        <div {...descriptionProps} className="text-sm">
          {props.description}
        </div>
      )}
    </div>
  );
};
