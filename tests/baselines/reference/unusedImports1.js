//// [tests/cases/compiler/unusedImports1.ts] ////

//// [file1.ts]
export class Calculator {

}

//// [file2.ts]
import {Calculator} from "./file1"

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
class Calculator {
}
exports.Calculator = Calculator;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
