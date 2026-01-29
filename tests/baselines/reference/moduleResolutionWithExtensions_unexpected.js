//// [tests/cases/compiler/moduleResolutionWithExtensions_unexpected.ts] ////

//// [normalize.css]
This file is not read.

//// [package.json]
{ "main": "normalize.css" }

//// [a.ts]
import "normalize.css";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("normalize.css");
