//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticPrivateField.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers
class C {
    @dec static #x: any;
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// needs: __esDecorate, __runInitializers
let C = (() => {
    let _static_private_x_decorators;
    let _static_private_x_initializers = [];
    let _static_private_x_extraInitializers = [];
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_x_decorators = [dec];
            tslib_1.__esDecorate(null, null, _static_private_x_decorators, { kind: "field", name: "#x", static: true, private: true, access: { has: obj => #x in obj, get: obj => obj.#x, set: (obj, value) => { obj.#x = value; } }, metadata: _metadata }, _static_private_x_initializers, _static_private_x_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static #x = tslib_1.__runInitializers(this, _static_private_x_initializers, void 0);
        static {
            tslib_1.__runInitializers(this, _static_private_x_extraInitializers);
        }
    };
})();
