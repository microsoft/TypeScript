//// [classExtendingNonConstructor.ts]
var x: {};

function foo() {
    this.x = 1;
}

class C1 extends undefined { }
class C2 extends true { }
class C3 extends false { }
class C4 extends 42 { }
class C5 extends "hello" { }
class C6 extends x { }
class C7 extends foo { }


//// [classExtendingNonConstructor.js]
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
var x;
function foo() {
    this.x = 1;
}
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C1;
}(undefined));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(true));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(false));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(42));
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C5;
}("hello"));
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C6;
}(x));
var C7 = /** @class */ (function (_super) {
    __extends(C7, _super);
    function C7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C7;
}(foo));
