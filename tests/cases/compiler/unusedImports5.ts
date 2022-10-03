//@noUnusedLocals:true
//@noUnusedParameters:true

// @Filename: file1.ts
export class Calculator {
    handleChar() {}
}

export function test() {

}

export function test2() {

}

// @Filename: file2.ts
import {Calculator, test, test2} from "./file1"

var x = new Calculator();
x.handleChar();
test();