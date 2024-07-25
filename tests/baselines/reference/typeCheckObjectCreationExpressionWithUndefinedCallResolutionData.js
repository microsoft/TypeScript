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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    var classes = undefined;
    return new classes(null);
}
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var f = require("./file1");
f.foo();


//// [file1.d.ts]
export declare function foo(): any;
//// [file2.d.ts]
export {};
