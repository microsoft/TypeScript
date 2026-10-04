//// [tests/cases/compiler/genericArrowFunctionInEsmExtensionFile.ts] ////

//// [a.mts]
// @see https://github.com/microsoft/TypeScript/issues/44442
const a = <T,>(arg: T): T => {
  return arg;
};

const b = <T>(arg: T): T => {
  return arg;
};


//// [a.mjs]
// @see https://github.com/microsoft/TypeScript/issues/44442
const a = (arg) => {
    return arg;
};
const b = (arg) => {
    return arg;
};
export {};
