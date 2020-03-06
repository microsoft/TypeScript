//// [tests/cases/compiler/moduleResolutionWithSymlinks.ts] ////

//// [index.ts]
// When symlinked files are in node_modules, they are resolved with realpath;
// so a linked file does not create a duplicate SourceFile of the real one.

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

/*
# To reproduce in a real project:

mkdir src; cd src
mkdir library-a
echo 'export class MyClass { private x: number; }' > library-a/index.ts

mkdir library-b; cd library-b
echo 'import {MyClass} from "library-a"; export { MyClass as MyClass2 }' > index.ts
mkdir node_modules; cd node_modules

ln -s ../../library-a library-a # Linux
# Windows: open command prompt as administrator and run: mklink /D library-a ..\..\library-a

cd ../.. # back to src
echo 'import { MyClass } from "./library-a"; import { MyClass2 } from "./library-b"; let x: MyClass; let y: MyClass2; x = y; y = x;' > app.ts
tsc app.ts # Should write to library-a/index.js, library-b/index.js, and app.js
*/


//// [/src/library-a/index.js]
"use strict";
// When symlinked files are in node_modules, they are resolved with realpath;
// so a linked file does not create a duplicate SourceFile of the real one.
exports.__esModule = true;
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;
//// [/src/library-b/index.js]
"use strict";
exports.__esModule = true;
exports.MyClass2 = void 0;
var library_a_1 = require("library-a");
exports.MyClass2 = library_a_1.MyClass;
//// [/src/app.js]
"use strict";
exports.__esModule = true;
var x;
var y;
x = y;
y = x;
/*
# To reproduce in a real project:

mkdir src; cd src
mkdir library-a
echo 'export class MyClass { private x: number; }' > library-a/index.ts

mkdir library-b; cd library-b
echo 'import {MyClass} from "library-a"; export { MyClass as MyClass2 }' > index.ts
mkdir node_modules; cd node_modules

ln -s ../../library-a library-a # Linux
# Windows: open command prompt as administrator and run: mklink /D library-a ..\..\library-a

cd ../.. # back to src
echo 'import { MyClass } from "./library-a"; import { MyClass2 } from "./library-b"; let x: MyClass; let y: MyClass2; x = y; y = x;' > app.ts
tsc app.ts # Should write to library-a/index.js, library-b/index.js, and app.js
*/
