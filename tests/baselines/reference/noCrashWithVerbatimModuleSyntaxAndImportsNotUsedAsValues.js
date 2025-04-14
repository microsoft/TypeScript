//// [tests/cases/compiler/noCrashWithVerbatimModuleSyntaxAndImportsNotUsedAsValues.ts] ////

//// [file.ts]
export class A {}
//// [index.ts]
import {A} from "./file";

const a: A = null as any;

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("./file");
var a = null;
