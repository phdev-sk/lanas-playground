import { useCallback, useEffect, useState } from "react";
import { ClassWatcher } from "../utils/ClassWatcher";
import { useLocalStorage } from "./useLocalStorage";
import { useMedia } from "./useMedia";

const usePrefersDarkMode = () => {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
};

export const useDarkMode = () => {
  const [isLocalStorageDarkmode, setLocalStorageDarkmode] =
    useLocalStorage<boolean>("dark-mode", false);

  const prefersDarkMode = usePrefersDarkMode();

  const [isDarkmode, setDarkmode] = useState(
    isLocalStorageDarkmode ?? prefersDarkMode,
  );

  const changeDarkmodeHandler = useCallback((isDarkmode: boolean) => {
    setLocalStorageDarkmode(isDarkmode);
    if (isDarkmode) {
      window.document.body.classList.add("dark");
    } else {
      window.document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    changeDarkmodeHandler(isDarkmode);

    const classWatcher = new ClassWatcher(
      window.document.body,
      "dark",
      () => setDarkmode(true),
      () => setDarkmode(false),
    );

    return () => classWatcher.disconnect();
  }, []);

  return [isDarkmode, changeDarkmodeHandler] as const;
};
