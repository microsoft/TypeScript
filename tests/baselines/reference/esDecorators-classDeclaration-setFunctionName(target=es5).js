//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionName.ts] ////

//// [a.ts]
declare let dec: any;

@dec class C {}

export {}

//// [b.ts]
declare let dec: any;

@dec export class C {}

//// [c.ts]
declare let dec: any;

@dec export default class C {}

//// [c.ts]
declare let dec: any;

@dec export default class {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let C = (() => {
    let C = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var C = _classThis = class {
        };
        __setFunctionName(_classThis, "C");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return C = _classThis;
    })();
    return C;
})();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
let C = (() => {
    let C = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var C = _classThis = class {
        };
        __setFunctionName(_classThis, "C");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return C = _classThis;
    })();
    return C;
})();
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let default_1 = (() => {
    let default_1 = (() => {
        let _classDecorators = [dec];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var default_1 = _classThis = class {
        };
        __setFunctionName(_classThis, "default");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            default_1 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return default_1 = _classThis;
    })();
    return default_1;
})();
exports.default = default_1;
