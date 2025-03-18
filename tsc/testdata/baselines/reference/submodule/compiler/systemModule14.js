//// [tests/cases/compiler/systemModule14.ts] ////

//// [systemModule14.ts]
function foo() {
    return a;
}

import {a} from "foo";
export {foo}

var x = 1;
export {foo as b}

//// [systemModule14.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.b = foo;
function foo() {
    return foo_1.a;
}
const foo_1 = require("foo");
var x = 1;
