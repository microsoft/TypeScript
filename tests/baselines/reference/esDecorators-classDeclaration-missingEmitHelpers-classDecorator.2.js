//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-classDecorator.2.ts] ////

//// [main.ts]
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
export default @dec class {}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.default = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var default_1 = class {
        static {
            tslib_1.__setFunctionName(this, "default");
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            tslib_1.__esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata: _metadata }, null, _classExtraInitializers);
            default_1 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib_1.__runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return default_1 = _classThis;
})();
