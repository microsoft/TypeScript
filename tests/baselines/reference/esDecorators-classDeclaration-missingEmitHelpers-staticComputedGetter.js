//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticComputedGetter.ts] ////

//// [main.ts]
export {}

declare var dec: any;
declare var x: any;

// needs: __esDecorate, __runInitializers, __propKey
class C {
    @dec static get [x]() { return 1; }
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// needs: __esDecorate, __runInitializers, __propKey
let C = (() => {
    var _a;
    let _staticExtraInitializers = [];
    let _static_get_member_decorators;
    return class C {
        static {
            tslib_1.__esDecorate(this, null, _static_get_member_decorators, { kind: "getter", name: _a, static: true, private: false }, null, _staticExtraInitializers);
            tslib_1.__runInitializers(this, _staticExtraInitializers);
        }
        static get [(_static_get_member_decorators = [dec], _a = tslib_1.__propKey(x))]() { return 1; }
    };
})();
