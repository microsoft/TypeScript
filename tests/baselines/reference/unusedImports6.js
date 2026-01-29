//// [tests/cases/compiler/unusedImports6.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

export default function test2() {

}

//// [file2.ts]
import d from "./file1"





//// [file1.js]
export class Calculator {
    handleChar() { }
}
export function test() {
}
export default function test2() {
}
//// [file2.js]
export {};
