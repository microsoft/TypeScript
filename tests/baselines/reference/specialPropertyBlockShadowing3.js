//// [tests/cases/compiler/specialPropertyBlockShadowing3.ts] ////

//// [index.js]
export const x = {};
x.inner = {};
if (Math.random()) {
  const x = {};
  x.inner = {};
  x.inner.test = 1;
}

export const y = {};
y.inner = {};
y.inner.test = "foo";

const aliasTopY = y;
if (Math.random()) {
  const y = {};
  y.inner = {};
  y.inner.test = 42;

  /** @type {{ inner: { test: string } }} */
  const topYcheck = aliasTopY;
  /** @type {{ inner: { test: number } }} */
  const blockYcheck = y;
}




//// [index.d.ts]
export namespace x {
    let inner: {};
}
export namespace y {
    namespace inner {
        let test: string;
    }
}
