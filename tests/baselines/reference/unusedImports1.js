//// [tests/cases/compiler/unusedImports1.ts] ////

//// [file1.ts]
export class Calculator {

}

//// [file2.ts]
import {Calculator} from "./file1"

//// [file1.js]
export class Calculator {
}
//// [file2.js]
export {};
