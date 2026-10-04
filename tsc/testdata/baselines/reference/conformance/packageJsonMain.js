//// [tests/cases/conformance/moduleResolution/packageJsonMain.ts] ////

//// [package.json]
{ "main": "oof" }

//// [oof.js]
module.exports = 0;

//// [package.json]
{ "main": "rab.js" }

//// [rab.js]
module.exports = 0;

//// [package.json]
{ "main": "zab" }

//// [index.js]
module.exports = 0;

//// [a.ts]
import foo = require("foo");
import bar = require("bar");
import baz = require("baz");
foo + bar + baz;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("foo");
const bar = require("bar");
const baz = require("baz");
foo + bar + baz;
