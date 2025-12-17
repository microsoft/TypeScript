//// [tests/cases/compiler/specialPropertyBlockShadowing1.ts] ////

//// [index.js]
export const X = {};
if (Math.random()) {
  const X = {};
  X.test = 1;
}

export const Y = {};
Y.test = "foo";
const aliasTopY = Y;
if (Math.random()) {
  const Y = {};
  Y.test = 42;

  /** @type {{ test: string }} */
  const topYcheck = aliasTopY;
  /** @type {{ test: number }} */
  const blockYcheck = Y;
}




//// [index.d.ts]
export const X: {};
export namespace Y {
    let test: string;
}
