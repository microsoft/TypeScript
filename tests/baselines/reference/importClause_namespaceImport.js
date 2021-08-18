//// [tests/cases/conformance/externalModules/typeOnly/importClause_namespaceImport.ts] ////

//// [a.ts]
export class A { a!: string }
export class B { b!: number }
export type C<T> = T;
export const Value = {};

//// [b.ts]
import type * as types from './a';
types;
types.Value;
let v: types.Value;
const a: types.A = {};
const b: types.B = {};
const c: types.C<string> = "";
const d = { types };


//// [a.js]
"use strict";
exports.__esModule = true;
exports.Value = exports.B = exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
exports.Value = {};
//// [b.js]
"use strict";
exports.__esModule = true;
types;
types.Value;
var v;
var a = {};
var b = {};
var c = "";
var d = { types: types };
