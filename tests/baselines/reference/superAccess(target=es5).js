//// [tests/cases/compiler/superAccess.ts] ////

//// [superAccess.ts]
class MyBase {
    static S1: number = 5;
    private S2: string = "test";
    f = () => 5;
}

class MyDerived extends MyBase {
    foo() {
        var l3 = super.S1;    // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l4 = super.S2;    // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l5 = super.f();   // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
    }
}

//// [superAccess.js]
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
var MyBase = /** @class */ (function () {
    function MyBase() {
        this.S2 = "test";
        this.f = function () { return 5; };
    }
    MyBase.S1 = 5;
    return MyBase;
}());
var MyDerived = /** @class */ (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDerived.prototype.foo = function () {
        var l3 = _super.prototype.S1; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l4 = _super.prototype.S2; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l5 = _super.prototype.f.call(this); // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
    };
    return MyDerived;
}(MyBase));
