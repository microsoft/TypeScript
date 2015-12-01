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
var foo = (function () {
    function foo() {
    }
    return foo;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
function bar() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bar;
var x = 10;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = x;
//// [m2.js]
"use strict";
var m1_1 = require("./m1");
m1_1.default();
