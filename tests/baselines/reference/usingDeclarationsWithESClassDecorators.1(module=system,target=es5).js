//// [usingDeclarationsWithESClassDecorators.1.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}


//// [usingDeclarationsWithESClassDecorators.1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _this, before, C, env_1;
    _this = this;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            env_1 = { stack: [], error: void 0, hasError: false };
            try {
                before = __addDisposableResource(env_1, null, false);
                C = function () {
                    var _classDecorators = [dec];
                    var _classDescriptor;
                    var _classExtraInitializers = [];
                    var _classThis;
                    var C = _classThis = /** @class */ (function () {
                        function C_1() {
                        }
                        return C_1;
                    }());
                    __setFunctionName(_classThis, "C");
                    (function () {
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
                        C = _classThis = _classDescriptor.value;
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return C = _classThis;
                }();
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
