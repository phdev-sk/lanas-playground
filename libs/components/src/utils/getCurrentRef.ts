import { RefObject } from "react";

export const getCurrentRef = <T>(ref: RefObject<T>) => {
  return () => {
    if (ref.current === null) {
      throw new Error(
        "getCurrentRef should only be used when ref is certainly defined",
      );
    }
    return ref.current;
  };
};
