//// [tests/cases/compiler/typeCheckObjectCreationExpressionWithUndefinedCallResolutionData.ts] ////

//// [file1.ts]
export function foo() {
var classes = undefined;
    return new classes(null);
}

//// [file2.ts]
import f = require('./file1');
f.foo();


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() {
    var classes = undefined;
    return new classes(null);
}
exports.foo = foo;
//// [file2.js]
"use strict";
exports.__esModule = true;
var f = require("./file1");
f.foo();


//// [file1.d.ts]
export declare function foo(): any;
//// [file2.d.ts]
export {};
