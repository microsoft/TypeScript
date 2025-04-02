//// [tests/cases/compiler/pathMappingBasedModuleResolution1_amd.ts] ////

//// [f1.ts]
export var x = 1;


//// [f1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 1;
});
