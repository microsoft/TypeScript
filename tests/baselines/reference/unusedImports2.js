//// [tests/cases/compiler/unusedImports2.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

//// [file2.ts]
import {Calculator} from "./file1"
import {test} from "./file1"

var x = new Calculator();
x.handleChar();

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
exports.test = test;
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.handleChar = function () { };
    return Calculator;
}());
exports.Calculator = Calculator;
function test() {
}
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file1_1 = require("./file1");
var x = new file1_1.Calculator();
x.handleChar();
