// @module: node16,node18,nodenext
// @resolveJsonModule: true
// @filename: index.ts
import json from "./package.json" with { type: "json" };
// @filename: otherc.cts
import json from "./package.json" with { type: "json" }; // should error, cjs mode imports don't support attributes
const json2 = import("./package.json", { with: { type: "json" } }); // should be fine
// @filename: package.json
{
    "name": "pkg",
    "private": true,
    "type": "module"
}
