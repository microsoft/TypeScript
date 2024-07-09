//// [tests/cases/compiler/pathMappingBasedModuleResolution2_classic.ts] ////

//// [file1.ts]
export var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 1;
});
