//// [tests/cases/compiler/unusedImports1.ts] ////

//// [file1.ts]
export class Calculator {

}

//// [file2.ts]
import {Calculator} from "./file1"

//// [file1.js]
"use strict";
exports.__esModule = true;
var Calculator = (function () {
    function Calculator() {
    }
    return Calculator;
}());
exports.Calculator = Calculator;
//// [file2.js]
"use strict";
exports.__esModule = true;
