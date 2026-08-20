//// [tests/cases/compiler/moduleResolutionWithExtensions_unexpected2.ts] ////

//// [foo.js]
This file is not read.

//// [package.json]
{ "types": "foo.js" }

//// [a.ts]
import "foo";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("foo");
