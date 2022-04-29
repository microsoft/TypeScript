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
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    var x = ext;
    return D;
});
