//// [tests/cases/compiler/moduleAugmentationInDependency.ts] ////

//// [index.d.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [app.js]
"use strict";
exports.__esModule = true;
require("A");
