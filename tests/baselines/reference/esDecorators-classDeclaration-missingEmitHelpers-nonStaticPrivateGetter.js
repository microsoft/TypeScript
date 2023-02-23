//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-nonStaticPrivateGetter.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
class C {
    @dec get #foo() { return 1; }
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
    let _private_get_foo_decorators;
    let _private_get_foo_descriptor;
    return class C {
        static {
            _private_get_foo_decorators = [dec];
            tslib_1.__esDecorate(this, _private_get_foo_descriptor = { get: tslib_1.__setFunctionName(function () { return 1; }, "#foo", "get") }, _private_get_foo_decorators, { kind: "getter", name: "#foo", static: false, private: true, access: { has: obj => #foo in obj, get: obj => obj.#foo } }, null, _instanceExtraInitializers);
        }
        get #foo() { return _private_get_foo_descriptor.get.call(this); }
        constructor() {
            tslib_1.__runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
