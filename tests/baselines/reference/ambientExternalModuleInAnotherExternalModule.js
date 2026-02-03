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
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
// Cannot resolve this ext module reference
var ext = require("ext");
var x = ext;
module.exports = D;
