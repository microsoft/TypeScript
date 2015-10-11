//// [tests/cases/conformance/classes/members/accessibility/internalStaticMemberAccessibility.ts] ////

//// [internalStaticMemberAccessibility_0.d.ts]
declare class Base1 {
    internal static foo: string;
}

//// [internalStaticMemberAccessibility_1.ts]
/// <reference path="internalStaticMemberAccessibility_0.d.ts" />
class Derived1 extends Base1 {
    static bar = Base1.foo; // error
    bing = () => Base1.foo; // error
}

class Base2 {
    internal static foo: string;
}

class Derived2 extends Base2 {
    static bar = Base2.foo; // ok
    bing = () => Base2.foo; // ok
}

//// [internalStaticMemberAccessibility_1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="internalStaticMemberAccessibility_0.d.ts" />
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
        this.bing = function () { return Base1.foo; }; // error
    }
    Derived1.bar = Base1.foo; // error
    return Derived1;
})(Base1);
var Base2 = (function () {
    function Base2() {
    }
    return Base2;
})();
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
        this.bing = function () { return Base2.foo; }; // ok
    }
    Derived2.bar = Base2.foo; // ok
    return Derived2;
})(Base2);
