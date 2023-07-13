//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.2.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithLegacyClassDecorators.2.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var before, C, env_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            env_1 = { stack: [], error: void 0, hasError: false };
            try {
                before = __addDisposableResource(env_1, null, false);
                exports_1("C", C = class C {
                });
                exports_1("C", C = __decorate([
                    dec
                ], C));
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
