//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsTopLevelOfModule.1.ts] ////

//// [awaitUsingDeclarationsTopLevelOfModule.1.ts]
export const x = 1;
export { y };

await using z = { async [Symbol.asyncDispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);


//// [awaitUsingDeclarationsTopLevelOfModule.1.js]
"use strict";
var z, y, _default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = exports.default = exports.y = exports.x = void 0;
exports.x = 1;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    z = __addDisposableResource(env_1, { async [Symbol.asyncDispose]() { } }, true);
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
    const result_1 = __disposeResources(env_1);
    if (result_1)
        await result_1;
}
