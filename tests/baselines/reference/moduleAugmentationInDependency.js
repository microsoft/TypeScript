//// [tests/cases/compiler/moduleAugmentationInDependency.ts] ////

//// [index.d.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [app.js]
"use strict";
require("A");
exports.__esModule = true;
