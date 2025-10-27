//// [tests/cases/compiler/ambientExternalModuleInAnotherExternalModule.ts] ////

//// [ambientExternalModuleInAnotherExternalModule.ts]
class D { }
export = D;

declare module "ext" {
    export class C { }
}

// Cannot resolve this ext module reference
import ext = require("ext");
var x = ext;

//// [ambientExternalModuleInAnotherExternalModule.js]
"use strict";
class D {
}
// Cannot resolve this ext module reference
const ext = require("ext");
var x = ext;
module.exports = D;
