// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/54948

function acceptNum(num: number) {}

const f1: (a: string, b: number) => void = function self(a, b?) {
  acceptNum(b); // error
  self("");
  self("", undefined);
};

const f2: (a: string, b: number) => void = function self(a, b?: number) {
  acceptNum(b); // error
  self("");
  self("", undefined);
};
