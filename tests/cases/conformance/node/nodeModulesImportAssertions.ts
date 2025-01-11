// @module: node16,node18,nodenext
// @resolveJsonModule: true
// @filename: index.ts
import json from "./package.json" assert { type: "json" };
// @filename: otherc.cts
import json from "./package.json" assert { type: "json" }; // should error, cjs mode imports don't support assertions
const json2 = import("./package.json", { assert: { type: "json" } }); // should be fine
// @filename: package.json
{
    "name": "pkg",
    "private": true,
    "type": "module"
}