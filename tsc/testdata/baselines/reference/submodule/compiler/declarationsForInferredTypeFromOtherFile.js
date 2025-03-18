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
class Foo {
}
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
const file2_1 = require("./file2");
function bar() {
    return (0, file2_1.foo)();
}
