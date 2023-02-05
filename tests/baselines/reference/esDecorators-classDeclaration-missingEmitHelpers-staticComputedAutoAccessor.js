//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticComputedAutoAccessor.ts] ////

//// [main.ts]
export {}

declare var dec: any;
declare var x: any;

// needs: __esDecorate, __runInitializers, __propKey
class C {
    @dec static accessor [x]: any;
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
    let _static_member_decorators;
    let _static_member_initializers = [];
    return class C {
        static {
            tslib_1.__esDecorate(this, null, _static_member_decorators, { kind: "accessor", name: _a, static: true, private: false }, _static_member_initializers, _staticExtraInitializers);
            tslib_1.__runInitializers(this, _staticExtraInitializers);
        }
        static #_a_accessor_storage = tslib_1.__runInitializers(this, _static_member_initializers, void 0);
        static get [(_static_member_decorators = [dec], _a = tslib_1.__propKey(x))]() { return this.#_a_accessor_storage; }
        static set [_a](value) { this.#_a_accessor_storage = value; }
    };
})();
