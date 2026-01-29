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
export class Calculator {
    handleChar() { }
}
export function test() {
}
export function test2() {
}
//// [file2.js]
import { Calculator as calc, test as t1 } from "./file1";
var x = new calc();
x.handleChar();
t1();
