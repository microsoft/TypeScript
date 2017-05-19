//// [tests/cases/compiler/moduleResolutionWithExtensions_unexpected.ts] ////

//// [normalize.css]
// This tests that a package.json "main" with an unexpected extension is ignored.

This file is not read.

//// [package.json]
{ "main": "normalize.css" }

//// [a.ts]
import "normalize.css";


//// [a.js]
"use strict";
exports.__esModule = true;
require("normalize.css");
