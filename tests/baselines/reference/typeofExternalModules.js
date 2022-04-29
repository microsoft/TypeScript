//// [tests/cases/compiler/typeofExternalModules.ts] ////

//// [typeofExternalModules_external.ts]
export class C { }

//// [typeofExternalModules_exportAssign.ts]
class D { }
export = D;

//// [typeofExternalModules_core.ts]
import ext = require('./typeofExternalModules_external');
import exp = require('./typeofExternalModules_exportAssign');

var y1: typeof ext = ext;
y1 = exp;
var y2: typeof exp = exp;
y2 = ext;

//// [typeofExternalModules_external.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [typeofExternalModules_exportAssign.js]
"use strict";
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
module.exports = D;
//// [typeofExternalModules_core.js]
"use strict";
exports.__esModule = true;
var ext = require("./typeofExternalModules_external");
var exp = require("./typeofExternalModules_exportAssign");
var y1 = ext;
y1 = exp;
var y2 = exp;
y2 = ext;
