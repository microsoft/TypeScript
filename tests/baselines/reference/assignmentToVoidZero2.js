//// [tests/cases/conformance/salsa/assignmentToVoidZero2.ts] ////

//// [assignmentToVoidZero2.js]
exports.j = 1;
exports.k = void 0;
var o = {}
o.x = 1
o.y = void 0
o.x + o.y

function C() {
    this.p = 1
    this.q = void 0
}
var c = new C()
c.p + c.q

//// [importer.js]
import { j, k } from './assignmentToVoidZero2'
j + k


//// [assignmentToVoidZero2.js]
exports.j = 1;
exports.k = void 0;
var o = {};
o.x = 1;
o.y = void 0;
o.x + o.y;
function C() {
    this.p = 1;
    this.q = void 0;
}
var c = new C();
c.p + c.q;
//// [importer.js]
"use strict";
exports.__esModule = true;
var assignmentToVoidZero2_1 = require("./assignmentToVoidZero2");
assignmentToVoidZero2_1.j + assignmentToVoidZero2_1.k;


//// [assignmentToVoidZero2.d.ts]
export var j: number;
//// [importer.d.ts]
export {};
