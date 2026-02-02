//// [tests/cases/conformance/es6/destructuring/destructuringSpread.ts] ////

//// [destructuringSpread.ts]
const { x } = {
  ...{},
  x: 0
};

const { y } = {
  y: 0,
  ...{}
};

const { z, a, b } = {
  z: 0,
  ...{ a: 0, b: 0 }
};

const { c, d, e, f, g } = {
  ...{
    ...{
      ...{
        c: 0,
      },
      d: 0
    },
    e: 0
  },
  f: 0
};


//// [destructuringSpread.js]
const { x } = Object.assign({}, { x: 0 });
const { y } = Object.assign({ y: 0 }, {});
const { z, a, b } = Object.assign({ z: 0 }, { a: 0, b: 0 });
const { c, d, e, f, g } = Object.assign(Object.assign({}, Object.assign(Object.assign({}, Object.assign({
    c: 0,
}, { d: 0 })), { e: 0 })), { f: 0 });
