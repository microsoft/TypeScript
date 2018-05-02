//// [tests/cases/compiler/globalFunctionAugmentationOverload.ts] ////

//// [mod.d.ts]
declare function expect(spy: Function): void;
declare function expect<T>(actual: ArrayLike<T>): void;
declare module "mod" {
    class mod {}
    export = mod;
}
//// [mine.ts]
import "mod";

declare global {
    function expect(element: string): void;
}
//// [index.d.ts]
declare function expect(spy: Function): void;

//// [mine.js]
"use strict";
exports.__esModule = true;
require("mod");
