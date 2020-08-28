// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: tests/cases/conformance/jsdoc/declarations/out
// @declaration: true
// @filename: node_modules/@types/node/index.d.ts
declare module "fs" {
    export class Something {}
}
// @filename: index.js
/// <reference types="node" />
export const Something = 2; // to show conflict that can occur
// @ts-ignore
export namespace A {
    // @ts-ignore
    export namespace B {
        const Something = require("fs").Something;
        const thing = new Something();
        // @ts-ignore
        export { thing };
    }
}
