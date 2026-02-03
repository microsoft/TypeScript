//// [tests/cases/compiler/ambientRequireFunction.ts] ////

//// [node.d.ts]
declare function require(moduleName: string): any;

declare module "fs" {
    export function readFileSync(s: string): string;
}

//// [app.js]
/// <reference path="node.d.ts"/>

const fs = require("fs");
const text = fs.readFileSync("/a/b/c");

//// [app.js]
/// <reference path="node.d.ts"/>
var fs = require("fs");
var text = fs.readFileSync("/a/b/c");
