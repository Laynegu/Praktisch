import { useState } from "react";

const useArray = <T>(
  array: T[]
): [T[], (...val: T[]) => void, (index: number) => void, () => void] => {
  const [arr, setArr] = useState(array);

  const clear = () => setArr([]);

  const add = (...val: T[]) => setArr([...arr, ...val]);

  const remove = (index: number) => {
    arr.splice(index, 1);
    setArr([...arr]);
  };

  return [arr, add, remove, clear];
};

export { useArray };
