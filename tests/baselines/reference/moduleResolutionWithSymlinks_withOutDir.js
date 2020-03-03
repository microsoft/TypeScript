//// [tests/cases/compiler/moduleResolutionWithSymlinks_withOutDir.ts] ////

//// [index.ts]
// Same as moduleResolutionWithSymlinks.ts, but with outDir

export class MyClass { private x: number; }

//// [index.ts]
import {MyClass} from "library-a";
export { MyClass as MyClass2 }

//// [app.ts]
import { MyClass } from "./library-a";
import { MyClass2 } from "./library-b";

let x: MyClass;
let y: MyClass2;
x = y;
y = x;


//// [/src/bin/library-a/index.js]
"use strict";
// Same as moduleResolutionWithSymlinks.ts, but with outDir
exports.__esModule = true;
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;
//// [/src/bin/library-b/index.js]
"use strict";
exports.__esModule = true;
exports.MyClass2 = void 0;
var library_a_1 = require("library-a");
exports.MyClass2 = library_a_1.MyClass;
//// [/src/bin/app.js]
"use strict";
exports.__esModule = true;
var x;
var y;
x = y;
y = x;
