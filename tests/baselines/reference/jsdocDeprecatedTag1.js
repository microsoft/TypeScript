//// [tests/cases/conformance/jsdoc/jsdocDeprecatedTag1.ts] ////

//// [a.ts]
export namespace foo {
    /** @deprecated */
    export function faff () { }
    faff()
}
const a = foo.faff() 
foo["faff"]
const { faff } = foo
faff()
/** @deprecated */
export function bar () {
    foo?.faff()
}
foo?.["faff"]?.()
bar();
/** @deprecated */
export interface Foo {
    /** @deprecated */
    zzz: number
}
/** @deprecated */
export type QW = Foo["zzz"]
export type WQ = QW

//// [b.ts]
import * as f from './a';
import { bar, QW } from './a';
f.bar();
f.foo.faff();
bar();
type Z = QW;
type A = f.Foo;
type B = f.QW;
type C = f.WQ;
type O = Z | A | B | C;

//// [a.js]
"use strict";
var _a;
exports.__esModule = true;
exports.bar = exports.foo = void 0;
var foo;
(function (foo) {
    /** @deprecated */
    function faff() { }
    foo.faff = faff;
    faff();
})(foo = exports.foo || (exports.foo = {}));
var a = foo.faff();
foo["faff"];
var faff = foo.faff;
faff();
/** @deprecated */
function bar() {
    foo === null || foo === void 0 ? void 0 : foo.faff();
}
exports.bar = bar;
(_a = foo === null || foo === void 0 ? void 0 : foo["faff"]) === null || _a === void 0 ? void 0 : _a.call(foo);
bar();
//// [b.js]
"use strict";
exports.__esModule = true;
var f = require("./a");
var a_1 = require("./a");
f.bar();
f.foo.faff();
a_1.bar();


//// [a.d.ts]
export declare namespace foo {
    /** @deprecated */
    function faff(): void;
}
/** @deprecated */
export declare function bar(): void;
/** @deprecated */
export interface Foo {
    /** @deprecated */
    zzz: number;
}
/** @deprecated */
export declare type QW = Foo["zzz"];
export declare type WQ = QW;
//// [b.d.ts]
export {};
