//// [tests/cases/compiler/superNewCall1.ts] ////

//// [superNewCall1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number, string> {
    constructor() {
        new super(value => String(value));
    }
}

//// [superNewCall1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A(map) {
        this.map = map;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = this;
        new _super.prototype(function (value) { return String(value); });
        return _this;
    }
    return B;
}(A));
