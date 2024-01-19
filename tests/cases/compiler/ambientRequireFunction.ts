// @module: commonjs, preserve
// @allowJs: true
// @outDir: ./out/

// @filename: node.d.ts

declare function require(moduleName: string): any;

declare module "fs" {
    export function readFileSync(s: string): string;
}

// @filename: app.js
/// <reference path="node.d.ts"/>

const fs = require("fs");
const text = fs.readFileSync("/a/b/c");