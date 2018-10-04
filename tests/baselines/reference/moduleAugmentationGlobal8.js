//// [moduleAugmentationGlobal8.ts]
namespace A {
    declare global {
        interface Array<T> { x }
    }
}
export {}


//// [moduleAugmentationGlobal8.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
