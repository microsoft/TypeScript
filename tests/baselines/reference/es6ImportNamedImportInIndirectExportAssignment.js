//// [tests/cases/compiler/es6ImportNamedImportInIndirectExportAssignment.ts] ////

//// [es6ImportNamedImportInIndirectExportAssignment_0.ts]
export module a {
    export class c {
    }
}

//// [es6ImportNamedImportInIndirectExportAssignment_1.ts]
import { a } from "./es6ImportNamedImportInIndirectExportAssignment_0";
import x = a;
export = x;

//// [es6ImportNamedImportInIndirectExportAssignment_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a;
(function (a) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    a.c = c;
})(a || (exports.a = a = {}));
//// [es6ImportNamedImportInIndirectExportAssignment_1.js]
"use strict";
var es6ImportNamedImportInIndirectExportAssignment_0_1 = require("./es6ImportNamedImportInIndirectExportAssignment_0");
var x = es6ImportNamedImportInIndirectExportAssignment_0_1.a;
module.exports = x;


//// [es6ImportNamedImportInIndirectExportAssignment_0.d.ts]
export declare namespace a {
    class c {
    }
}
//// [es6ImportNamedImportInIndirectExportAssignment_1.d.ts]
import { a } from "./es6ImportNamedImportInIndirectExportAssignment_0";
import x = a;
export = x;
