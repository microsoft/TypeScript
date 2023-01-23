//// [noImplicitUseStrict_amd.ts]
export var x = 0;

//// [noImplicitUseStrict_amd.js]
define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 0;
});
