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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
exports.test = test;
exports.default = test2;
class Calculator {
    handleChar() { }
}
exports.Calculator = Calculator;
function test() {
}
function test2() {
}
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
