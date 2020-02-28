//// [tests/cases/compiler/unusedImports7.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

export default function test2() {

}

//// [file2.ts]
import * as n from "./file1"



//// [file1.js]
"use strict";
exports.__esModule = true;
exports.test = exports.Calculator = void 0;
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.handleChar = function () { };
    return Calculator;
}());
exports.Calculator = Calculator;
function test() {
}
exports.test = test;
function test2() {
}
exports["default"] = test2;
//// [file2.js]
"use strict";
exports.__esModule = true;
