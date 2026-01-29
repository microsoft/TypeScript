//// [tests/cases/compiler/unusedImports4.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

export function test2() {

}

//// [file2.ts]
import {Calculator, test, test2} from "./file1"

var x = new Calculator();
x.handleChar();
test2();

//// [file1.js]
export class Calculator {
    handleChar() { }
}
export function test() {
}
export function test2() {
}
//// [file2.js]
import { Calculator, test2 } from "./file1";
var x = new Calculator();
x.handleChar();
test2();
