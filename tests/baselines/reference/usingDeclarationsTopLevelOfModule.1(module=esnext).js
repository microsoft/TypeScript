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
export const x = 1;
export { y };
export { _default as default };
var z, y, _default;
export let w;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
    y = 2;
    w = 3;
    _default = 4;
    console.log(w, x, y, z);
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
