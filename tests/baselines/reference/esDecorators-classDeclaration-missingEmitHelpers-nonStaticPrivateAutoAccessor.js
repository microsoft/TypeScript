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
    let _private_x_decorators;
    let _private_x_initializers = [];
    let _private_x_extraInitializers = [];
    let _private_x_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_x_decorators = [dec];
            tslib_1.__esDecorate(this, _private_x_descriptor = { get: tslib_1.__setFunctionName(function () { return this.#x_accessor_storage; }, "#x", "get"), set: tslib_1.__setFunctionName(function (value) { this.#x_accessor_storage = value; }, "#x", "set") }, _private_x_decorators, { kind: "accessor", name: "#x", static: false, private: true, access: { has: obj => #x in obj, get: obj => obj.#x, set: (obj, value) => { obj.#x = value; } }, metadata: _metadata }, _private_x_initializers, _private_x_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #x_accessor_storage = tslib_1.__runInitializers(this, _private_x_initializers, void 0);
        get #x() { return _private_x_descriptor.get.call(this); }
        set #x(value) { return _private_x_descriptor.set.call(this, value); }
        constructor() {
            tslib_1.__runInitializers(this, _private_x_extraInitializers);
        }
    };
})();
