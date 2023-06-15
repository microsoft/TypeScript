//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.14.ts] ////

//// [main.ts]
export {};
declare var dec: any;
declare var x: any;

// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [x]: @dec class {} });

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
({ [_a = tslib_1.__propKey(x)]: (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_1 = class {
            static {
                tslib_1.__setFunctionName(this, _a);
                const metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
                tslib_1.__esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata: metadata }, null, _classExtraInitializers);
                class_1 = _classThis = _classDescriptor.value;
                if (metadata) Object.defineProperty(_classThis, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
                tslib_1.__runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_1 = _classThis;
    })() });
