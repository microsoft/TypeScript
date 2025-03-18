//// [tests/cases/compiler/augmentExportEquals6.ts] ////

//// [file1.ts]
class foo {}
namespace foo {
    export class A {}
    export namespace B { export let a; }
}
export = foo;

//// [file2.ts]
import x = require("./file1"); 
x.B.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a: number }
    namespace B {
        export let b: number;
    }
}

//// [file3.ts]
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = a.a;
let c = x.B.b;

//// [file1.js]
"use strict";
class foo {
}
(function (foo) {
    class A {
    }
    foo.A = A;
    let B;
    (function (B) {
    })(B = foo.B || (foo.B = {}));
})(foo || (foo = {}));
module.exports = foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./file1");
x.B.b = 1;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./file1");
require("./file2");
let a;
let b = a.a;
let c = x.B.b;
