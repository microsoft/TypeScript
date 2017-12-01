//// [tests/cases/compiler/moduleAugmentationInDependency2.ts] ////

//// [index.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [index.js]
"use strict";
exports.__esModule = true;
//// [app.js]
"use strict";
exports.__esModule = true;
require("A");
