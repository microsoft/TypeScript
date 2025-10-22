//// [tests/cases/compiler/expandoFunctionBlockShadowing2.ts] ////

//// [index.js]
export function X() {}
if (Math.random()) {
  /** @type {{ test?: any }} */
  const X = {};
  Object.defineProperty(X, "test", { value: 1 });
}

export function Y() {}
Object.defineProperty(Y, "test", { value: "foo" });
const aliasTopY = Y;
if (Math.random()) {
  const Y = function Y() {}
  Object.defineProperty(Y, "test", { value: 42 });

  /** @type {{ (): void; test: string }} */
  const topYcheck = aliasTopY;
  /** @type {{ (): void; test: number }} */
  const blockYcheck = Y;
}




//// [index.d.ts]
export function X(): void;
export function Y(): void;
export namespace Y {
    let test: string;
}
