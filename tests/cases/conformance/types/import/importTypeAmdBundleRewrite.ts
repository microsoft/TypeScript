// @declaration: true
// @module: amd
// @outFile: bundle.js
// @filename: a/b/c.ts
export interface Foo {
    x: 12;
}
// @filename: a/inner.ts
const c: import("./b/c").Foo = {x: 12};
export {c};

// @filename: index.ts
const d: typeof import("./a/inner")["c"] = {x: 12};
export {d};
