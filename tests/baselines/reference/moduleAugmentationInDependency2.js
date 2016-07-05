//// [tests/cases/compiler/moduleAugmentationInDependency2.ts] ////

//// [index.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [app.js]
"use strict";
require("A");
