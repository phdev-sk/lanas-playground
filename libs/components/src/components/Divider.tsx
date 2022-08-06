export interface DividerProps {
  text?: string;
}

export const Divider = ({ text }: DividerProps) => {
  return (
    <div className="relative flex justify-center items-center border-b dark:border-slate-700 text-slate-500 dark:text-slate-500">
      {text && (
        <div className="absolute bg-white dark:bg-slate-800  px-2">{text}</div>
      )}
    </div>
  );
};
