//// [tests/cases/conformance/es6/modules/defaultExportsCannotMerge02.ts] ////

//// [m1.ts]

export default class foo {

}

export default function bar() {

}

var x = 10;
export default x;

//// [m2.ts]
import Entity from "m1"

Entity();

//// [m1.js]
var foo = (function () {
    function foo() {
    }
    return foo;
})();
exports.default = foo;
function bar() {
}
exports.default = bar;
var x = 10;
exports.default = x;
//// [m2.js]
var m1_1 = require("m1");
m1_1.default();
