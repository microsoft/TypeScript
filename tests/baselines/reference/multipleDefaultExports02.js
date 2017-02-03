//// [tests/cases/conformance/es6/modules/multipleDefaultExports02.ts] ////

//// [m1.ts]

export default function foo() {

}

export default function bar() {

}

//// [m2.ts]
import Entity from "./m1"

Entity();

//// [m1.js]
"use strict";
function foo() {
}
exports.default = foo;
function bar() {
}
exports.default = bar;
Object.defineProperty(exports, "__esModule", { value: true });
//// [m2.js]
"use strict";
var m1_1 = require("./m1");
m1_1.default();
