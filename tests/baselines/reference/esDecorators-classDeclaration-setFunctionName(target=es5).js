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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = function () {
    var _a;
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        __setFunctionName(_a, "C"),
        (function () {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
}();
//// [b.js]
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = exports.C = function () {
    var _a;
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        __setFunctionName(_a, "C"),
        (function () {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
}();
//// [c.js]
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = function () {
    var _a;
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var default_1 = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        (function () {
            __setFunctionName(_a, "default_1");
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            default_1 = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return default_1;
}();
exports.default = default_1;
