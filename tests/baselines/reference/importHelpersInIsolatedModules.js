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

//// [external.js]
"use strict";
var tslib_1 = require("tslib");
var A = (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var B = (function (_super) {
    tslib_1.__extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
}(A));
exports.B = B;
var C = (function () {
    function C() {
    }
    C.prototype.method = function (x) {
    };
    return C;
}());
tslib_1.__decorate([
    tslib_1.__param(0, dec),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], C.prototype, "method", null);
C = tslib_1.__decorate([
    dec,
    tslib_1.__metadata("design:paramtypes", [])
], C);
//// [script.js]
"use strict";
var tslib_1 = require("tslib");
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    tslib_1.__extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
}(A));
var C = (function () {
    function C() {
    }
    C.prototype.method = function (x) {
    };
    return C;
}());
tslib_1.__decorate([
    tslib_1.__param(0, dec),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], C.prototype, "method", null);
C = tslib_1.__decorate([
    dec,
    tslib_1.__metadata("design:paramtypes", [])
], C);
