//// [tests/cases/compiler/moduleResolutionWithSymlinks.ts] ////

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
export class MyClass {
}
//// [/src/library-b/index.js]
import { MyClass } from "library-a";
export { MyClass as MyClass2 };
//// [/src/app.js]
let x;
let y;
x = y;
y = x;
export {};
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
