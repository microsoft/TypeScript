//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.1.ts] ////

//// [usingDeclarationsTopLevelOfModule.1.ts]
export const x = 1;
export { y };

using z = { [Symbol.dispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);


//// [usingDeclarationsTopLevelOfModule.1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.w = exports.default = exports.y = exports.x = void 0;
    exports.x = 1;
    var z, y, _default;
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
        exports.y = y = 2;
        exports.w = 3;
        exports.default = _default = 4;
        console.log(exports.w, exports.x, y, z);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
});
