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
    let _static_member_decorators;
    let _static_member_initializers = [];
    let _static_member_extraInitializers = [];
    return class C {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            tslib_1.__esDecorate(this, null, _static_member_decorators, { kind: "accessor", name: _a, static: true, private: false, access: { has: obj => _a in obj, get: obj => obj[_a], set: (obj, value) => { obj[_a] = value; } }, metadata: _metadata }, _static_member_initializers, _static_member_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static #_a_accessor_storage = tslib_1.__runInitializers(this, _static_member_initializers, void 0);
        static get [(_static_member_decorators = [dec], _a = tslib_1.__propKey(x))]() { return C.#_a_accessor_storage; }
        static set [_a](value) { C.#_a_accessor_storage = value; }
        static {
            tslib_1.__runInitializers(this, _static_member_extraInitializers);
        }
    };
})();
