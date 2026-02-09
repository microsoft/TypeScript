//// [tests/cases/conformance/es6/modules/reExportDefaultExport.ts] ////

//// [m1.ts]
export default function f() {
}
export {f};


//// [m2.ts]
import foo from "./m1";
import {f} from "./m1";

f();
foo();

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
exports.f = f;
function f() {
}
//// [m2.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const m1_1 = __importDefault(require("./m1"));
const m1_2 = require("./m1");
(0, m1_2.f)();
(0, m1_1.default)();
