import { useEffect, useState } from "react";

/**
 * 防抖
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceVal;
};
