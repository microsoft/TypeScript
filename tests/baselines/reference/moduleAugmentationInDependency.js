//// [tests/cases/compiler/moduleAugmentationInDependency.ts] ////

//// [index.d.ts]
declare module "ext" {
}
export {};

//// [app.ts]
import "A"

//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("A");
