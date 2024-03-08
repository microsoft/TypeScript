//// [tests/cases/compiler/unusedImports8.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

export function test2() {

}

//// [file2.ts]
import {Calculator as calc, test as t1, test2 as t2} from "./file1"

var x = new calc();
x.handleChar();
t1();

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
exports.test = test;
exports.test2 = test2;
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.handleChar = function () { };
    return Calculator;
}());
exports.Calculator = Calculator;
function test() {
}
function test2() {
}
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file1_1 = require("./file1");
var x = new file1_1.Calculator();
x.handleChar();
(0, file1_1.test)();
