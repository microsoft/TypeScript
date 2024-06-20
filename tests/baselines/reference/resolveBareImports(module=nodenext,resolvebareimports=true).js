//// [tests/cases/compiler/resolveBareImports.ts] ////

//// [resolveBareImports.ts]
import "does-not-exist";
import "./does-not-exist-either";
import "./does-not-exist-either.js";


//// [resolveBareImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("does-not-exist");
require("./does-not-exist-either");
require("./does-not-exist-either.js");
