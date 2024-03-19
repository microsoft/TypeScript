//// [tests/cases/compiler/moduleResolutionWithSymlinks_withOutDir.ts] ////

//// [index.ts]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;
//// [/src/bin/library-b/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass2 = void 0;
var library_a_1 = require("library-a");
Object.defineProperty(exports, "MyClass2", { enumerable: true, get: function () { return library_a_1.MyClass; } });
//// [/src/bin/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x;
var y;
x = y;
y = x;
