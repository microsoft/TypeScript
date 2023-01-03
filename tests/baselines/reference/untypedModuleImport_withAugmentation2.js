//// [tests/cases/compiler/untypedModuleImport_withAugmentation2.ts] ////

//// [index.d.ts]
// This tests that augmenting an untyped module is forbidden even in an ambient context. Contrast with `moduleAugmentationInDependency.ts`.

declare module "js" {
    export const j: number;
}
export {};

//// [index.js]
This file is not processed.

//// [a.ts]
import { } from "augmenter";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
