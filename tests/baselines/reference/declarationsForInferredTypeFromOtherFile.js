//// [tests/cases/compiler/declarationsForInferredTypeFromOtherFile.ts] ////

//// [file1.ts]
export class Foo {}
//// [file2.ts]
export function foo(): import("./file1").Foo {
    return null as any;
}
//// [file3.ts]
import {foo} from "./file2";
export function bar() {
    return foo();
}


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    return null;
}
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
var file2_1 = require("./file2");
function bar() {
    return (0, file2_1.foo)();
}


//// [file1.d.ts]
export declare class Foo {
}
//// [file2.d.ts]
export declare function foo(): import("./file1").Foo;
//// [file3.d.ts]
export declare function bar(): import("./file1").Foo;
