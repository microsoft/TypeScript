// @module: nodenext
// @filename: a.mts

// @see https://github.com/microsoft/TypeScript/issues/44442
const a = <T,>(arg: T): T => {
  return arg;
};

const b = <T>(arg: T): T => {
  return arg;
};
