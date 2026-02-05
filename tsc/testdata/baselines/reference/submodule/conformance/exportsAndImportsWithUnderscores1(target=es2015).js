//// [tests/cases/conformance/es6/modules/exportsAndImportsWithUnderscores1.ts] ////

//// [m1.ts]
var R: any
export default R = {
    "__": 20,
    "_": 10
    "___": 30
}

//// [m2.ts]
import R from "./m1";
const { __, _, ___ } = R;


//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R;
exports.default = R = {
    "__": 20,
    "_": 10,
    "___": 30
};
//// [m2.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const m1_1 = __importDefault(require("./m1"));
const { __, _, ___ } = m1_1.default;
