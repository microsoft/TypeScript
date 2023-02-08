//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-missingEmitHelpers-classDecorator.15.ts] ////

//// [main.ts]
export {};
declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
class C { D = @dec class {} }

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// uses __esDecorate, __runInitializers, __setFunctionName
class C {
    D = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var class_1 = class {
            static {
                tslib_1.__setFunctionName(this, "D");
                tslib_1.__esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
                class_1 = _classThis = _classDescriptor.value;
                tslib_1.__runInitializers(_classThis, _classExtraInitializers);
            }
        };
        return class_1 = _classThis;
    })();
}
