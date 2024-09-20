// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58794

export const fn1 = <const T,>({
  [length - 1]: finalItem,
  length,
}: readonly T[]): T | undefined => {
  return finalItem;
};

export const fn2 = <const T,>({
  length,
  [length - 1]: finalItem,
}: readonly T[]): T | undefined => {
  return finalItem;
};
