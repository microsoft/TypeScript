//// [tests/cases/compiler/augmentExportEquals4.ts] ////

//// [file1.ts]
class foo {}
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
    var foo = /** @class */ (function () {
        function foo() {
        }
        return foo;
    }());
    (function (foo) {
        foo.v = 1;
    })(foo || (foo = {}));
    return foo;
});
//// [file2.js]
define(["require", "exports", "./file1"], function (require, exports, x) {
    "use strict";
    exports.__esModule = true;
    x.b = 1;
});
//// [file3.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports", "./file1", "./file2"], function (require, exports, x) {
    "use strict";
    exports.__esModule = true;
    x = __importStar(x);
    var a;
    var b = x.b;
});
