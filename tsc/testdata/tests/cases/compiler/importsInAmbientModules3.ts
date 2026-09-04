// @target: es2015
// @module: commonjs

// @filename: external.d.ts
export default class C {}

// @filename: main.ts

declare module "M" {
    import C = require("external");
}