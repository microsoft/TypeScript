//// [tests/cases/compiler/exportDefaultQualifiedNameNoError.ts] ////

//// [code.ts]
class C { static x = 0; };
export default C.x;
//// [usage.ts]
import def from "./code";
void def;

//// [code.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let C = (() => {
    class C {
    }
    C.x = 0;
    return C;
})();
;
exports.default = C.x;
//// [usage.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = __importDefault(require("./code"));
void code_1.default;
