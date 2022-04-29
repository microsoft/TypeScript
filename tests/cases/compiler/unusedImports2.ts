//@noUnusedLocals:true
//@noUnusedParameters:true

// @Filename: file1.ts
export class Calculator {
    handleChar() {}
}

export function test() {

}

// @Filename: file2.ts
import {Calculator} from "./file1"
import {test} from "./file1"

var x = new Calculator();
x.handleChar();