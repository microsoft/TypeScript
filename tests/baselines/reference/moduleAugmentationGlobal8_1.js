//// [moduleAugmentationGlobal8_1.ts]
namespace A {
    global {
        interface Array<T> { x }
    }
}
export {}


//// [moduleAugmentationGlobal8_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
