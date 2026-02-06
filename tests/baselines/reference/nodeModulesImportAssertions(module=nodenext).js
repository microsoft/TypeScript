//// [tests/cases/conformance/node/nodeModulesImportAssertions.ts] ////

//// [index.ts]
import json from "./package.json" with { type: "json" };
//// [otherc.cts]
import json from "./package.json" with { type: "json" }; // should error, cjs mode imports don't support attributes
const json2 = import("./package.json", { with: { type: "json" } }); // should be fine
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
const json2 = import("./package.json", { with: { type: "json" } }); // should be fine
