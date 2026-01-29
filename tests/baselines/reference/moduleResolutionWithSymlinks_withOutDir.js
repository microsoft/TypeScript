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
export class MyClass {
}
//// [/src/bin/library-b/index.js]
import { MyClass } from "library-a";
export { MyClass as MyClass2 };
//// [/src/bin/app.js]
let x;
let y;
x = y;
y = x;
export {};
