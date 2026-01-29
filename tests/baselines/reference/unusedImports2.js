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
export class Calculator {
    handleChar() { }
}
export function test() {
}
//// [file2.js]
import { Calculator } from "./file1";
var x = new Calculator();
x.handleChar();
