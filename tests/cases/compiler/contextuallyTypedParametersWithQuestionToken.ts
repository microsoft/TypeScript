// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/54948

const f1: (a: string, b: number) => void = function self(a, b?) {
  b;
  self("");
  self("", undefined);
};

const f2: (a: string, b: number) => void = function self(a, b?: number) {
  b;
  self("");
  self("", undefined);
};
