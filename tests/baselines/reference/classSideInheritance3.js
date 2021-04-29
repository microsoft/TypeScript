//// [classSideInheritance3.ts]
class A {
    constructor(public x: string) {
    }
}
class B extends A {
    constructor(x: string, public data: string) {
        super(x);
    }
}
class C extends A {
    constructor(x: string) {
        super(x);
    }
}

var r1: typeof A = B; // error
var r2: new (x: string) => A = B; // error
var r3: typeof A = C; // ok

//// [classSideInheritance3.js]
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
    function A(x) {
        this.x = x;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B(x, data) {
        var _this = _super.call(this, x) || this;
        _this.data = data;
        return _this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(x) {
        return _super.call(this, x) || this;
    }
    return C;
}(A));
var r1 = B; // error
var r2 = B; // error
var r3 = C; // ok
