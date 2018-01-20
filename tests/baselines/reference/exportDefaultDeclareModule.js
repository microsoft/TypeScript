//// [tests/cases/compiler/exportDefaultDeclareModule.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792
export default declare module A {
    export const A1: number;
    export class A2 {

    }
}

//// [b.ts]
import A from "./a";

const namespaceAUsage = A.A1

//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var namespaceAUsage = a_1["default"].A1;
