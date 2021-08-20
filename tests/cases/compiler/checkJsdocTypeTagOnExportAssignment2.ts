// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: checkJsdocTypeTagOnExportAssignment2.js

// @Filename: a.ts
export interface Foo {
    a: number;
    b: number;
}

// @Filename: b.js
/** @type {import("./a").Foo} */
export default { c: false };

// @Filename: c.js
import b from "./b";
b;
