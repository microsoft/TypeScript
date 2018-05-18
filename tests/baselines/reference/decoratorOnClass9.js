//// [decoratorOnClass9.ts]
declare var dec: any;

class A {}

// https://github.com/Microsoft/TypeScript/issues/16417
@dec
class B extends A {
    static x = 1;
    static y = B.x;
    m() {
        return B.x;
    }
}

//// [decoratorOnClass9.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
// https://github.com/Microsoft/TypeScript/issues/16417
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B_1 = B;
    B.prototype.m = function () {
        return B_1.x;
    };
    var B_1;
    B.x = 1;
    B.y = B_1.x;
    B = B_1 = __decorate([
        dec
    ], B);
    return B;
}(A));
