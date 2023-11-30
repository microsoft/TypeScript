//// [tests/cases/compiler/expandoFunctionBlockShadowing.ts] ////

//// [expandoFunctionBlockShadowing.ts]
// https://github.com/microsoft/TypeScript/issues/56538

export function X(): void {}
if (Math.random()) {
  const X: { test?: any } = {};
  X.test = 1;
}

export function Y(): void {}
Y.test = "foo";
const aliasTopY = Y;
if (Math.random()) {
  const Y = function Y() {}
  Y.test = 42;

  const topYcheck: { (): void; test: string } = aliasTopY;
  const blockYcheck: { (): void; test: number } = Y;
}

/// [Declarations] ////



//// [expandoFunctionBlockShadowing.d.ts]
export declare function X(): void;
export declare function Y(): void;
export declare namespace Y {
    var test: string;
}
//# sourceMappingURL=expandoFunctionBlockShadowing.d.ts.map