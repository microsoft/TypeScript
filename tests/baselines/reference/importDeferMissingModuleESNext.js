//// [tests/cases/conformance/importDefer/importDeferMissingModuleESNext.ts] ////

//// [a.ts]
export function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer * as aNs from "a";

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
var aNs = require("a");
aNs.foo();
