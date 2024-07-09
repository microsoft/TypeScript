//// [tests/cases/compiler/externalModuleExportingGenericClass.ts] ////

//// [externalModuleExportingGenericClass_file0.ts]
class C<T> {
    foo: T;
}
export = C;


//// [externalModuleExportingGenericClass_file1.ts]
import a = require('./externalModuleExportingGenericClass_file0');
var v: a; // this should report error
var v2: any = (new a()).foo;
var v3: number = (new a<number>()).foo;


//// [externalModuleExportingGenericClass_file0.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
module.exports = C;
//// [externalModuleExportingGenericClass_file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = require("./externalModuleExportingGenericClass_file0");
var v; // this should report error
var v2 = (new a()).foo;
var v3 = (new a()).foo;
