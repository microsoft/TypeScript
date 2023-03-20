//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-nonStaticPrivateField.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers
class C {
    @dec #x: any;
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// needs: __esDecorate, __runInitializers
let C = (() => {
    let _instanceExtraInitializers = [];
    let _private_x_decorators;
    let _private_x_initializers = [];
    return class C {
        static {
            _private_x_decorators = [dec];
            tslib_1.__esDecorate(null, null, _private_x_decorators, { kind: "field", name: "#x", static: false, private: true, access: { has: obj => #x in obj, get: obj => obj.#x, set: (obj, value) => { obj.#x = value; } } }, _private_x_initializers, _instanceExtraInitializers);
        }
        #x = (tslib_1.__runInitializers(this, _instanceExtraInitializers), tslib_1.__runInitializers(this, _private_x_initializers, void 0));
    };
})();
