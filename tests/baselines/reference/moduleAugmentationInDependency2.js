//// [tests/cases/compiler/moduleAugmentationInDependency2.ts] ////

//// [index.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("A");
