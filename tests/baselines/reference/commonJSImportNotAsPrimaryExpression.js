//// [tests/cases/conformance/externalModules/commonJSImportNotAsPrimaryExpression.ts] ////

//// [foo_0.ts]
export class C1 {
	m1 = 42;
	static s1 = true;
}

export interface I1 {
	name: string;
	age: number;
}

export module M1 {
	export interface I2 {
		foo: string;
	}
}

export enum E1 {
	A,B,C
}

//// [foo_1.ts]
import foo = require("./foo_0");
// None of the below should cause a runtime dependency on foo_0
import f = foo.M1;
var i: f.I2;
var x: foo.C1 = <{m1: number}>{};
var y: typeof foo.C1.s1 = false;
var z: foo.M1.I2;
var e: number = <foo.E1>0;

//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E1 = exports.C1 = void 0;
class C1 {
    m1 = 42;
    static s1 = true;
}
exports.C1 = C1;
var E1;
(function (E1) {
    E1[E1["A"] = 0] = "A";
    E1[E1["B"] = 1] = "B";
    E1[E1["C"] = 2] = "C";
})(E1 || (exports.E1 = E1 = {}));
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i;
var x = {};
var y = false;
var z;
var e = 0;
