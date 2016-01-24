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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyBase = (function () {
    function MyBase() {
        this.S2 = "test";
        this.f = function () { return 5; };
    }
    MyBase.S1 = 5;
    return MyBase;
}());
var MyDerived = (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        _super.apply(this, arguments);
    }
    MyDerived.prototype.foo = function () {
        var l3 = _super.prototype.S1; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l4 = _super.prototype.S2; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l5 = _super.prototype.f.call(this); // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
    };
    return MyDerived;
}(MyBase));
