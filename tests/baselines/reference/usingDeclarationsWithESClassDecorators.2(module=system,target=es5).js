//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.2.ts] ////

//// [usingDeclarationsWithESClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithESClassDecorators.2.js]
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
                exports_1("C", C = (() => {
                    let _classDecorators = [dec];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var C = _classThis = class {
                    };
                    __setFunctionName(_classThis, "C");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        C = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return C = _classThis;
                })());
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
