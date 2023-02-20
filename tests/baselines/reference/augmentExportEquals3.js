//// [tests/cases/compiler/augmentExportEquals3.ts] ////

//// [file1.ts]
function foo() {}
namespace foo {
    export var v = 1;
}
export = foo;

//// [file2.ts]
import x = require("./file1"); 
x.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a }
    let b: number;
}

//// [file3.ts]
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = x.b;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { }
    (function (foo) {
        foo.v = 1;
    })(foo || (foo = {}));
    return foo;
});
//// [file2.js]
define(["require", "exports", "./file1"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x.b = 1;
});
//// [file3.js]
define(["require", "exports", "./file1", "./file2"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a;
    var b = x.b;
});
