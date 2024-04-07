// @strict: true
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @filename: index.js

/** @type () => string */
function fn1() {
  return 42;
}

/** @type () => string */
function fn2() {
  return "foo";
}

/** @type (arg: string) => string */
function fn3(arg) {
  return arg;
}

/** @type ({ type: 'foo' } | { type: 'bar' }) & { prop: number } */
const obj1 = { type: "foo", prop: 10 };

/** @type ({ type: 'foo' } | { type: 'bar' }) & { prop: number } */
const obj2 = { type: "other", prop: 10 };
