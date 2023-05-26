//// [usingDeclarationsWithESClassDecorators.4.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}


//// [usingDeclarationsWithESClassDecorators.4.js]
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var before, default_1, _default;
var env_1 = { stack: [], error: void 0, hasError: false };
try {
    before = __addDisposableResource(env_1, null, false);
    default_1 = function () {
        var _classDecorators = [dec];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var default_1 = _classThis = /** @class */ (function () {
            function default_1() {
            }
            return default_1;
        }());
        (function () {
            __setFunctionName(_classThis, "default");
        })();
        (function () {
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            default_1 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return default_1 = _classThis;
    }();
    exports.default = _default = default_1;
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
