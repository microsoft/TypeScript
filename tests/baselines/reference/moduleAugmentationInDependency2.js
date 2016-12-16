//// [tests/cases/compiler/moduleAugmentationInDependency2.ts] ////

//// [index.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [index.js]
"use strict";
//// [app.js]
"use strict";
require("A");
