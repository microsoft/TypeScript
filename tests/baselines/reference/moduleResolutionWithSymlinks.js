//// [tests/cases/compiler/moduleResolutionWithSymlinks.ts] ////

//// [index.ts]

export class MyClass{}

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

//// [index.js]
"use strict";
var MyClass = (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;
//// [index.js]
"use strict";
var library_a_1 = require("library-a");
exports.MyClass2 = library_a_1.MyClass;
//// [app.js]
"use strict";
var x;
var y;
x = y;
y = x;
