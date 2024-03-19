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
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
exports.default = foo;
function bar() {
}
var x = 10;
exports.default = x;
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
(0, m1_1.default)();
