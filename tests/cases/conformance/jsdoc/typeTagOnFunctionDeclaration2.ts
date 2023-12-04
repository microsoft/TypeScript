// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

export function test1() {}

/** @type {{(arg1: string): void;}} */
function setter1(arg1) {}

Object.defineProperty(test1, "foo", {
  set: setter1,
});

export function test2() {}

/** @type {{(arg1: string): void; bar: number}} */
function setter2(arg1) {}
setter2.bar = 10;

Object.defineProperty(test2, "foo", {
  set: setter2,
});
