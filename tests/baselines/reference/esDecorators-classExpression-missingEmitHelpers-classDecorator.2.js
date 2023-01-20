//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.2.ts] ////

//// [main.ts]
declare var dec: any;

// uses: __esDecorate, __runInitializers
export const C = @dec class C {};

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const tslib_1 = require("tslib");
// uses: __esDecorate, __runInitializers
exports.C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static {
            tslib_1.__esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            tslib_1.__runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
