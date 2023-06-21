//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticComputedSetter.ts] ////

//// [main.ts]
export {}

declare var dec: any;
declare var x: any;

// needs: __esDecorate, __runInitializers, __propKey
class C {
    @dec static set [x](value: number) { }
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
    let _static_set_member_decorators;
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            tslib_1.__esDecorate(this, null, _static_set_member_decorators, { kind: "setter", name: _a, static: true, private: false, access: { has: obj => _a in obj, set: (obj, value) => { obj[_a] = value; } }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib_1.__runInitializers(this, _staticExtraInitializers);
        }
        static set [(_static_set_member_decorators = [dec], _a = tslib_1.__propKey(x))](value) { }
    };
})();
