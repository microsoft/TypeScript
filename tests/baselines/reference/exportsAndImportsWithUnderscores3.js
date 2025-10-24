//// [tests/cases/conformance/es6/modules/exportsAndImportsWithUnderscores3.ts] ////

//// [m1.ts]
var R: any
export default R = {
    "___": 30,
    "___hello": 21,
    "_hi": 40,
}

//// [m2.ts]
import R from "./m1";
const { ___, ___hello, _hi } = R;


//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R;
exports.default = R = {
    "___": 30,
    "___hello": 21,
    "_hi": 40,
};
//// [m2.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = __importDefault(require("./m1"));
const { ___, ___hello, _hi } = m1_1.default;
