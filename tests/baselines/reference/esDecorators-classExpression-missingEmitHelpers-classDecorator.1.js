//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.1.ts] ////

//// [main.ts]
declare var dec: any;

// uses: __esDecorate, __runInitializers, __setFunctionName
export const C = @dec class {};

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const tslib_1 = require("tslib");
// uses: __esDecorate, __runInitializers, __setFunctionName
exports.C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_1 = class {
        static { _classThis = this; }
        static { tslib_1.__setFunctionName(_classThis, "C"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            tslib_1.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            class_1 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib_1.__runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return class_1 = _classThis;
})();
