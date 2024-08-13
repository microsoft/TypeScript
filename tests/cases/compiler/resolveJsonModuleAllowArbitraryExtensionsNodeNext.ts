// @declaration: true
// @module: nodenext
// @allowArbitraryExtensions: true
// @resolveJsonModule: true
// @listFiles: true
// @filename: cjs/package.json
{ "type": "commonjs" }
// @filename: cjs/foo.json
["foo", "bar", "baz"]
// @filename: cjs/foo.d.json.ts
declare const data: ["foo", "bar", "baz"];
export = data;
// @filename: cjs/index.mts
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format - error (`default` is whole file, file has no `default` member)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
// @filename: cjs/secondary.cts
import data from "./foo.json";
data.default; // error (cjs format `.d.json.ts`, export= object is require result)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
// @filename: esm/package.json
{ "type": "module" }
// @filename: esm/foo.json
["foo", "bar", "baz"]
// @filename: esm/foo.d.json.ts
declare const data: ["foo", "bar", "baz"];
export = data;
// @filename: esm/index.mts
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format despite package - error! (default import is already the whole json object)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
// @filename: esm/secondary.cts
import data from "./foo.json";
data.default; // `export=` object is the whole `require` result, hoisted to `default` by interop helper, no 2nd default
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
// @filename: root.mts
import "./cjs/index.mjs";
import "./cjs/secondary.mjs";
import "./mjs/index.mjs";
import "./mjs/secondary.mjs";
