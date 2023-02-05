//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-nonStaticPrivateAutoAccessor.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
class C {
    @dec accessor #x: any;
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// needs: __esDecorate, __runInitializers, __setFunctionName
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_x_decorators;
    let _private_x_initializers = [];
    let _private_x_descriptor;
    return class C {
        static {
            _private_x_decorators = [dec];
            tslib_1.__esDecorate(this, _private_x_descriptor = { get: tslib_1.__setFunctionName(function () { return this.#x_accessor_storage; }, "#x", "get"), set: tslib_1.__setFunctionName(function (value) { this.#x_accessor_storage = value; }, "#x", "set") }, _private_x_decorators, { kind: "accessor", name: "#x", static: false, private: true }, _private_x_initializers, _instanceExtraInitializers);
        }
        #x_accessor_storage = (tslib_1.__runInitializers(this, _instanceExtraInitializers), tslib_1.__runInitializers(this, _private_x_initializers, void 0));
        get #x() { return _private_x_descriptor.get.call(this); }
        set #x(value) { return _private_x_descriptor.set.call(this, value); }
    };
})();
