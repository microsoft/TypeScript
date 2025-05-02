//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-nonStaticPrivateMethod.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
class C {
    @dec #foo() {}
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
    let _private_foo_decorators;
    let _private_foo_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_foo_decorators = [dec];
            tslib_1.__esDecorate(this, _private_foo_descriptor = { value: tslib_1.__setFunctionName(function () { }, "#foo") }, _private_foo_decorators, { kind: "method", name: "#foo", static: false, private: true, access: { has: obj => #foo in obj, get: obj => obj.#foo }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get #foo() { return _private_foo_descriptor.value; }
        constructor() {
            tslib_1.__runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
