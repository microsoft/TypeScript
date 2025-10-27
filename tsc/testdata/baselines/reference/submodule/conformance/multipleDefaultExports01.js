//// [tests/cases/conformance/es6/modules/multipleDefaultExports01.ts] ////

//// [m1.ts]
export default class foo {

}

export default function bar() {

}

var x = 10;
export default x;

//// [m2.ts]
import Entity from "./m1"

Entity();

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bar;
class foo {
}
exports.default = foo;
function bar() {
}
var x = 10;
exports.default = x;
//// [m2.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const m1_1 = __importDefault(require("./m1"));
(0, m1_1.default)();
