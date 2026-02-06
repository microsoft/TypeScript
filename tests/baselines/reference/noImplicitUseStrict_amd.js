//// [tests/cases/compiler/noImplicitUseStrict_amd.ts] ////

//// [noImplicitUseStrict_amd.ts]
export var x = 0;

//// [noImplicitUseStrict_amd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 0;
});
