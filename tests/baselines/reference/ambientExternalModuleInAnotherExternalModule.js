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
<<<<<<< HEAD
define(["require", "exports", "ext"], function (require, exports, ext) {
    "use strict";
    class D {
    }
    var x = ext;
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports", "ext"], function (require, exports, ext) {
    "use strict";
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    var x = ext;
=======
"use strict";
var D = /** @class */ (function () {
    function D() {
    }
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
    return D;
}());
// Cannot resolve this ext module reference
var ext = require("ext");
var x = ext;
module.exports = D;
