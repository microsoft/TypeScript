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
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, z, y, _default, w, env_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 1);
            env_1 = { stack: [], error: void 0, hasError: false };
            try {
                z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
                exports_1("y", y = 2);
                exports_1("w", w = 3);
                exports_1("default", _default = 4);
                console.log(w, x, y, z);
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        }
    };
});
