//// [tests/cases/compiler/importHelpersInIsolatedModules.ts] ////

//// [external.ts]
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

//// [script.ts]
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;


//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
var tslib_1 = require("tslib");
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
exports.B = B;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function (x) {
    };
    (0, tslib_1.__decorate)([
        (0, tslib_1.__param)(0, dec),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Number]),
        (0, tslib_1.__metadata)("design:returntype", void 0)
    ], C.prototype, "method", null);
    C = (0, tslib_1.__decorate)([
        dec
    ], C);
    return C;
}());
//// [script.js]
var tslib_1 = require("tslib");
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function (x) {
    };
    (0, tslib_1.__decorate)([
        (0, tslib_1.__param)(0, dec),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Number]),
        (0, tslib_1.__metadata)("design:returntype", void 0)
    ], C.prototype, "method", null);
    C = (0, tslib_1.__decorate)([
        dec
    ], C);
    return C;
}());
