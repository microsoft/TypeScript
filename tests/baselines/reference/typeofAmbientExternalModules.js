//// [tests/cases/compiler/typeofAmbientExternalModules.ts] ////

//// [typeofAmbientExternalModules_0.ts]
export class C { foo: string; }

//// [typeofAmbientExternalModules_1.ts]
class D { bar: string; }
export = D;

//// [typeofAmbientExternalModules_2.ts]
///<reference path='typeofAmbientExternalModules_0.ts'/>
///<reference path='typeofAmbientExternalModules_1.ts'/>
import ext = require('./typeofAmbientExternalModules_0');
import exp = require('./typeofAmbientExternalModules_1');

var y1: typeof ext = ext;
y1 = exp;
var y2: typeof exp = exp;
y2 = ext;

//// [typeofAmbientExternalModules_0.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [typeofAmbientExternalModules_1.js]
"use strict";
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
module.exports = D;
//// [typeofAmbientExternalModules_2.js]
"use strict";
exports.__esModule = true;
///<reference path='typeofAmbientExternalModules_0.ts'/>
///<reference path='typeofAmbientExternalModules_1.ts'/>
var ext = require("./typeofAmbientExternalModules_0");
var exp = require("./typeofAmbientExternalModules_1");
var y1 = ext;
y1 = exp;
var y2 = exp;
y2 = ext;
