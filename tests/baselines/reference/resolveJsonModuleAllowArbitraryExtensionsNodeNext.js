//// [tests/cases/compiler/resolveJsonModuleAllowArbitraryExtensionsNodeNext.ts] ////

//// [package.json]
{ "type": "commonjs" }
//// [foo.json]
["foo", "bar", "baz"]
//// [foo.d.json.ts]
declare const data: ["foo", "bar", "baz"];
export = data;
//// [index.mts]
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format - error (`default` is whole file, file has no `default` member)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [secondary.cts]
import data from "./foo.json";
data.default; // error (cjs format `.d.json.ts`, export= object is require result)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [package.json]
{ "type": "module" }
//// [foo.json]
["foo", "bar", "baz"]
//// [foo.d.json.ts]
declare const data: ["foo", "bar", "baz"];
export = data;
//// [index.mts]
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format despite package - error! (default import is already the whole json object)
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [secondary.cts]
import data from "./foo.json";
data.default; // `export=` object is the whole `require` result, hoisted to `default` by interop helper, no 2nd default
import data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [root.mts]
import "./cjs/index.mjs";
import "./cjs/secondary.mjs";
import "./mjs/index.mjs";
import "./mjs/secondary.mjs";


//// [index.mjs]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format - error (`default` is whole file, file has no `default` member)
const data2 = __require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [secondary.cjs]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foo_json_1 = __importDefault(require("./foo.json"));
foo_json_1.default.default; // error (cjs format `.d.json.ts`, export= object is require result)
const data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [index.mjs]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import data from "./foo.json" with { type: "json" };
data.default; // foo.d.json.ts is cjs format despite package - error! (default import is already the whole json object)
const data2 = __require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [secondary.cjs]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foo_json_1 = __importDefault(require("./foo.json"));
foo_json_1.default.default; // `export=` object is the whole `require` result, hoisted to `default` by interop helper, no 2nd default
const data2 = require("./foo.json");
data2.default; // `data2` is the whole json object, no `default`
//// [root.mjs]
import "./cjs/index.mjs";
import "./cjs/secondary.mjs";
import "./mjs/index.mjs";
import "./mjs/secondary.mjs";


//// [index.d.mts]
export {};
//// [secondary.d.cts]
export {};
//// [index.d.mts]
export {};
//// [secondary.d.cts]
export {};
//// [root.d.mts]
import "./cjs/index.mjs";
import "./cjs/secondary.mjs";
import "./mjs/index.mjs";
import "./mjs/secondary.mjs";
