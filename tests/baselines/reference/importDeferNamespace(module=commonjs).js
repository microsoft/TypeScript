//// [tests/cases/conformance/importDefer/importDeferNamespace.ts] ////

//// [a.ts]
export function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer * as aNs from "./a.js";

aNs.foo();

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    console.log("foo from a");
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aNs = require("./a.js");
aNs.foo();
