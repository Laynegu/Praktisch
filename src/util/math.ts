export const getRandomNum = (start: number, end: number): number => {
  let a = Math.min(start, end);
  let b = a === start ? end : start;
  return Math.floor(Math.random() * (b - a + 1) + a);
};
