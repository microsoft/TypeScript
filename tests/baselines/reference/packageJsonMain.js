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
exports.__esModule = true;
var foo = require("foo");
var bar = require("bar");
var baz = require("baz");
foo + bar + baz;
