//// [tests/cases/compiler/resolveSideEffectImports.ts] ////

//// [resolveSideEffectImports.ts]
import "does-not-exist";
import "./does-not-exist-either";
import "./does-not-exist-either.js";


//// [resolveSideEffectImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("does-not-exist");
require("./does-not-exist-either");
require("./does-not-exist-either.js");
