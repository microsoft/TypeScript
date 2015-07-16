//// [tests/cases/conformance/es6/modules/defaultExportsCannotMerge03.ts] ////

//// [m1.ts]

export default function foo() {

}

export default function bar() {

}

//// [m2.ts]
import Entity from "m1"

Entity();

//// [m1.js]
function foo() {
}
exports.default = foo;
function bar() {
}
exports.default = bar;
//// [m2.js]
var m1_1 = require("m1");
m1_1.default();
