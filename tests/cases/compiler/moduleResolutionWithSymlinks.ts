// @module: commonjs
// @noImplicitReferences: true
// @traceResolution: true

// @filename: /src/library-a/index.ts
// @symlink: /src/library-b/node_modules/library-a/index.ts
export class MyClass{}

// @filename: /src/library-b/index.ts
import {MyClass} from "library-a";
export { MyClass as MyClass2 }

// @filename: /src/app.ts
import { MyClass } from "./library-a";
import { MyClass2 } from "./library-b";

let x: MyClass;
let y: MyClass2;
x = y;
y = x;