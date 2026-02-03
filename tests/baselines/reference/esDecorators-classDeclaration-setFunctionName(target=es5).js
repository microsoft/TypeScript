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
var C = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = _classThis = /** @class */ (function () {
        function C_1() {
        }
        return C_1;
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = _classThis = /** @class */ (function () {
        function C_1() {
        }
        return C_1;
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var default_1 = _classThis = /** @class */ (function () {
        function default_1() {
        }
        return default_1;
    }());
    __setFunctionName(_classThis, "default");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        default_1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return default_1 = _classThis;
}();
exports.default = default_1;
