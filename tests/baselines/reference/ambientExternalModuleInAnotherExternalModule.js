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
define(["require", "exports", "ext"], function (require, exports, ext) {
    "use strict";
    class D {
    }
    var x = ext;
    return D;
});
