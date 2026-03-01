//// [tests/cases/conformance/es6/modules/exportsAndImportsWithUnderscores4.ts] ////

//// [m1.ts]
declare var console: any;
export function _() {
    console.log("_");
}
export function __() {
    console.log("__");
}
export function ___() {
    console.log("___");
}
export function _hi() {
    console.log("_hi");
}
export function __proto() {
    console.log("__proto");
}
export function __esmodule() {
    console.log("__esmodule");
}
export function ___hello(){
    console.log("___hello");
}

//// [m2.ts]
import {_, __, ___hello, __esmodule, __proto, _hi}  from "./m1";
_();
__();
___hello();
__esmodule();
__proto();
_hi();

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = _;
exports.__ = __;
exports.___ = ___;
exports._hi = _hi;
exports.__proto = __proto;
exports.__esmodule = __esmodule;
exports.___hello = ___hello;
function _() {
    console.log("_");
}
function __() {
    console.log("__");
}
function ___() {
    console.log("___");
}
function _hi() {
    console.log("_hi");
}
function __proto() {
    console.log("__proto");
}
function __esmodule() {
    console.log("__esmodule");
}
function ___hello() {
    console.log("___hello");
}
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
(0, m1_1._)();
(0, m1_1.__)();
(0, m1_1.___hello)();
(0, m1_1.__esmodule)();
(0, m1_1.__proto)();
(0, m1_1._hi)();
