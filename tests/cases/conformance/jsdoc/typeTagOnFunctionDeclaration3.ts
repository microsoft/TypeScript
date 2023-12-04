// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

export function test1() {}

/** @type {{(): string;}} */
function getter1() {
  return "";
}

Object.defineProperty(test1, "foo", {
  get: getter1,
});

export function test2() {}

/** @type {{(): string; bar: number}} */
function getter2() {
  return "";
}
getter2.bar = 10;

Object.defineProperty(test2, "foo", {
  get: getter2,
});
