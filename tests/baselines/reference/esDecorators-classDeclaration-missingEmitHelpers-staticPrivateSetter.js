//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticPrivateSetter.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
class C {
    @dec static set #foo(value: number) { }
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// needs: __esDecorate, __runInitializers, __setFunctionName
let C = (() => {
    let _staticExtraInitializers = [];
    let _static_private_set_foo_decorators;
    let _static_private_set_foo_descriptor;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_set_foo_decorators = [dec];
            tslib_1.__esDecorate(this, _static_private_set_foo_descriptor = { set: tslib_1.__setFunctionName(function (value) { }, "#foo", "set") }, _static_private_set_foo_decorators, { kind: "setter", name: "#foo", static: true, private: true, access: { has: obj => #foo in obj, set: (obj, value) => { obj.#foo = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib_1.__runInitializers(this, _staticExtraInitializers);
        }
        static set #foo(value) { return _static_private_set_foo_descriptor.set.call(this, value); }
    };
})();
