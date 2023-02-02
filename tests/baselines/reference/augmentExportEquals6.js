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
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo = /** @class */ (function () {
        function foo() {
        }
        return foo;
    }());
    (function (foo) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
        foo.A = A;
        var B;
        (function (B) {
        })(B = foo.B || (foo.B = {}));
    })(foo || (foo = {}));
    return foo;
});
//// [file2.js]
define(["require", "exports", "./file1"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x.B.b = 1;
});
//// [file3.js]
define(["require", "exports", "./file1", "./file2"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a;
    var b = a.a;
    var c = x.B.b;
});
