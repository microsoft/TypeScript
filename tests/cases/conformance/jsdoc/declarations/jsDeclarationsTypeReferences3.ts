// @allowJs: true
// @checkJs: true
// @target: es5, es2015
// @outDir: tests/cases/conformance/jsdoc/declarations/out
// @declaration: true
// @types: *
// @filename: node_modules/@types/node/index.d.ts
declare module "fs" {
    export class Something {}
}
// @filename: index.js
/// <reference types="node" />

const Something = require("fs").Something;
module.exports.A = {}
module.exports.A.B = {
    thing: new Something()
}
