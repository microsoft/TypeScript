//// [tests/cases/conformance/externalModules/importNonStringLiteral.ts] ////

//// [foo_0.ts]
var x = "filename";
import foo = require(x); // invalid


//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = "filename";
