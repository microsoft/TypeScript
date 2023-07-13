//// [tests/cases/compiler/superElementAccess.ts] ////

//// [superElementAccess.ts]
class MyBase {
    m1(a: string) { return a; }
    private p1() { }
    m2: () => void = function () { }
    d1: number = 42;
    private d2: number = 42;
    get value() {return 0 }
    set value(v: number) { }
}


class MyDerived extends MyBase {

    foo() {
        super["m1"]("hi");                                     // Should be allowed, method on base prototype

        var l2 = super["m1"].bind(this);                       // Should be allowed, can access properties as well as invoke

        var x: (a: string) => string = super["m1"];            // Should be allowed, can assign to var with compatible signature

        super["m2"].bind(this);                                // Should error, instance property, not a public instance member function

        super["p1"]();                                         // Should error, private not public instance member function

        var l1 = super["d1"];                                  // Should error, instance data property not a public instance member function

        var l1 = super["d2"];                                  // Should error, instance data property not a public instance member function

        super["m1"] = function (a: string) { return ""; };     // Should be allowed, we will not restrict assignment

        super["value"] = 0;                                    // Should error, instance data property not a public instance member function
        
        var z = super["value"];                                // Should error, instance data property not a public instance member function
    }
}

//// [superElementAccess.js]
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
        this.m2 = function () { };
        this.d1 = 42;
        this.d2 = 42;
    }
    MyBase.prototype.m1 = function (a) { return a; };
    MyBase.prototype.p1 = function () { };
    Object.defineProperty(MyBase.prototype, "value", {
        get: function () { return 0; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return MyBase;
}());
var MyDerived = /** @class */ (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDerived.prototype.foo = function () {
        _super.prototype["m1"].call(this, "hi"); // Should be allowed, method on base prototype
        var l2 = _super.prototype["m1"].bind(this); // Should be allowed, can access properties as well as invoke
        var x = _super.prototype["m1"]; // Should be allowed, can assign to var with compatible signature
        _super.prototype["m2"].bind(this); // Should error, instance property, not a public instance member function
        _super.prototype["p1"].call(this); // Should error, private not public instance member function
        var l1 = _super.prototype["d1"]; // Should error, instance data property not a public instance member function
        var l1 = _super.prototype["d2"]; // Should error, instance data property not a public instance member function
        _super.prototype["m1"] = function (a) { return ""; }; // Should be allowed, we will not restrict assignment
        _super.prototype["value"] = 0; // Should error, instance data property not a public instance member function
        var z = _super.prototype["value"]; // Should error, instance data property not a public instance member function
    };
    return MyDerived;
}(MyBase));
