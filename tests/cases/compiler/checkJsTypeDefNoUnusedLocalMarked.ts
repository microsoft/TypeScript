// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noUnusedLocals: true
// @filename: file.ts
class Foo {
    x: number;
}

declare global {
    var module: any; // Just here to remove unrelated error from test
}

export = Foo;
// @filename: something.js
/** @typedef {typeof import("./file")} Foo */

/** @typedef {(foo: Foo) => string} FooFun */

module.exports = /** @type {FooFun} */(void 0);