//// [tests/cases/compiler/modulePreserveImportHelpers.ts] ////

//// [a.mts]
declare var dec: any

@dec()
export class A {}

//// [b.cts]
declare var dec: any

@dec()
class B {}
export {};

//// [c.ts]
declare var dec: any

@dec()
export class C {}

//// [package.json]
{
    "type": "module"
}

//// [package.json]
{
    "name": "tslib",
    "main": "tslib.js",
    "types": "tslib.d.ts"
}

//// [tslib.d.ts]
export declare function __esDecorate(...args: any[]): any;
export declare function __runInitializers(...args: any[]): any;


//// [a.mjs]
import { __esDecorate, __runInitializers } from "tslib";
let A = (() => {
    let _classDecorators = [dec()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var A = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            A = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return A = _classThis;
})();
export { A };
//// [b.cjs]
const tslib_1 = require("tslib");
let B = (() => {
    let _classDecorators = [dec()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var B = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            tslib_1.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            B = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib_1.__runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return B = _classThis;
})();
//// [c.js]
import { __esDecorate, __runInitializers } from "tslib";
let C = (() => {
    let _classDecorators = [dec()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
export { C };
