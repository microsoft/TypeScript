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
    let _staticExtraInitializers = [];
    let _static_private_x_decorators;
    let _static_private_x_initializers = [];
    return class C {
        static {
            _static_private_x_decorators = [dec];
            tslib_1.__esDecorate(null, null, _static_private_x_decorators, { kind: "field", name: "#x", static: true, private: true }, _static_private_x_initializers, _staticExtraInitializers);
            tslib_1.__runInitializers(this, _staticExtraInitializers);
        }
        static #x = tslib_1.__runInitializers(this, _static_private_x_initializers, void 0);
    };
})();
