//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.3.ts] ////

//// [usingDeclarationsTopLevelOfModule.3.ts]
export { y };

using z = { [Symbol.dispose]() {} };

if (false) {
    var y = 1;
}

function f() {
    console.log(y, z);
}



//// [usingDeclarationsTopLevelOfModule.3.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var z, env_1, y;
    var __moduleName = context_1 && context_1.id;
    function f() {
        console.log(y, z);
    }
    return {
        setters: [],
        execute: function () {
            env_1 = { stack: [], error: void 0, hasError: false };
            try {
                z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
                if (false) {
                    y = 1;
                    exports_1("y", y);
                }
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
