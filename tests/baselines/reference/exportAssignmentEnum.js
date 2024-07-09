//// [tests/cases/compiler/exportAssignmentEnum.ts] ////

//// [exportAssignmentEnum_A.ts]
enum E {
	A,
	B,
	C,
}

export = E;

//// [exportAssignmentEnum_B.ts]
import EnumE = require("./exportAssignmentEnum_A");

var a = EnumE.A;
var b = EnumE.B;
var c = EnumE.C;

//// [exportAssignmentEnum_A.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
module.exports = E;
//// [exportAssignmentEnum_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumE = require("./exportAssignmentEnum_A");
var a = EnumE.A;
var b = EnumE.B;
var c = EnumE.C;
