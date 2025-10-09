//// [tests/cases/conformance/node/nodeModulesImportAssertions.ts] ////

//// [index.ts]
import json from "./package.json" assert { type: "json" };
//// [otherc.cts]
import json from "./package.json" assert { type: "json" }; // should error, cjs mode imports don't support assertions
const json2 = import("./package.json", { assert: { type: "json" } }); // should be fine
//// [package.json]
{
    "name": "pkg",
    "private": true,
    "type": "module"
}

//// [index.js]
export {};
//// [otherc.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json2 = import("./package.json", { assert: { type: "json" } }); // should be fine
