//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithObjectMembers4.ts] ////

//// [assignmentCompatWithObjectMembers4.ts]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is not assignable M

module OnlyDerived {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Base { baz: string; }

    class S { foo: Derived; }
    class T { foo: Derived2; }
    var s: S;
    var t: T;

    interface S2 { foo: Derived; }
    interface T2 { foo: Derived2; }
    var s2: S2;
    var t2: T2;

    var a: { foo: Derived; }
    var b: { foo: Derived2; }

    var a2 = { foo: new Derived() };
    var b2 = { foo: new Derived2() };

    s = t; // error
    t = s; // error
    s = s2; // ok
    s = a2; // ok

    s2 = t2; // error
    t2 = s2; // error
    s2 = t; // error
    s2 = b; // error
    s2 = a2; // ok

    a = b; // error
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok

    a2 = b2; // error
    b2 = a2; // error
    a2 = b; // error
    a2 = t2; // error
    a2 = t; // error
}

module WithBase {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Base { baz: string; }

    class S { foo: Base; }
    class T { foo: Derived2; }
    var s: S;
    var t: T;

    interface S2 { foo: Base; }
    interface T2 { foo: Derived2; }
    var s2: S2;
    var t2: T2;

    var a: { foo: Base; }
    var b: { foo: Derived2; }

    var a2 = { foo: new Base() };
    var b2 = { foo: new Derived2() };

    s = t; // ok
    t = s; // error
    s = s2; // ok
    s = a2; // ok

    s2 = t2; // ok
    t2 = s2; // error
    s2 = t; // ok
    s2 = b; // ok
    s2 = a2; // ok

    a = b; // ok
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok

    a2 = b2; // ok
    b2 = a2; // error
    a2 = b; // ok
    a2 = t2; // ok
    a2 = t; // ok
}

//// [assignmentCompatWithObjectMembers4.js]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is not assignable M
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
var OnlyDerived;
(function (OnlyDerived) {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived;
    }(Base));
    var Derived2 = /** @class */ (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived2;
    }(Base));
    var S = /** @class */ (function () {
        function S() {
        }
        return S;
    }());
    var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());
    var s;
    var t;
    var s2;
    var t2;
    var a;
    var b;
    var a2 = { foo: new Derived() };
    var b2 = { foo: new Derived2() };
    s = t; // error
    t = s; // error
    s = s2; // ok
    s = a2; // ok
    s2 = t2; // error
    t2 = s2; // error
    s2 = t; // error
    s2 = b; // error
    s2 = a2; // ok
    a = b; // error
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok
    a2 = b2; // error
    b2 = a2; // error
    a2 = b; // error
    a2 = t2; // error
    a2 = t; // error
})(OnlyDerived || (OnlyDerived = {}));
var WithBase;
(function (WithBase) {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived;
    }(Base));
    var Derived2 = /** @class */ (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived2;
    }(Base));
    var S = /** @class */ (function () {
        function S() {
        }
        return S;
    }());
    var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());
    var s;
    var t;
    var s2;
    var t2;
    var a;
    var b;
    var a2 = { foo: new Base() };
    var b2 = { foo: new Derived2() };
    s = t; // ok
    t = s; // error
    s = s2; // ok
    s = a2; // ok
    s2 = t2; // ok
    t2 = s2; // error
    s2 = t; // ok
    s2 = b; // ok
    s2 = a2; // ok
    a = b; // ok
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok
    a2 = b2; // ok
    b2 = a2; // error
    a2 = b; // ok
    a2 = t2; // ok
    a2 = t; // ok
})(WithBase || (WithBase = {}));
