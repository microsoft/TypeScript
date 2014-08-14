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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is not assignable M
var OnlyDerived;
(function (OnlyDerived) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();
    var Derived = (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            _super.apply(this, arguments);
        }
        return Derived;
    })(Base);
    var Derived2 = (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            _super.apply(this, arguments);
        }
        return Derived2;
    })(Base);
    var S = (function () {
        function S() {
        }
        return S;
    })();
    var T = (function () {
        function T() {
        }
        return T;
    })();
    var s;
    var t;
    var s2;
    var t2;
    var a;
    var b;
    var a2 = { foo: new Derived() };
    var b2 = { foo: new Derived2() };
    s = t;
    t = s;
    s = s2;
    s = a2;
    s2 = t2;
    t2 = s2;
    s2 = t;
    s2 = b;
    s2 = a2;
    a = b;
    b = a;
    a = s;
    a = s2;
    a = a2;
    a2 = b2;
    b2 = a2;
    a2 = b;
    a2 = t2;
    a2 = t;
})(OnlyDerived || (OnlyDerived = {}));
var WithBase;
(function (WithBase) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();
    var Derived = (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            _super.apply(this, arguments);
        }
        return Derived;
    })(Base);
    var Derived2 = (function (_super) {
        __extends(Derived2, _super);
        function Derived2() {
            _super.apply(this, arguments);
        }
        return Derived2;
    })(Base);
    var S = (function () {
        function S() {
        }
        return S;
    })();
    var T = (function () {
        function T() {
        }
        return T;
    })();
    var s;
    var t;
    var s2;
    var t2;
    var a;
    var b;
    var a2 = { foo: new Base() };
    var b2 = { foo: new Derived2() };
    s = t;
    t = s;
    s = s2;
    s = a2;
    s2 = t2;
    t2 = s2;
    s2 = t;
    s2 = b;
    s2 = a2;
    a = b;
    b = a;
    a = s;
    a = s2;
    a = a2;
    a2 = b2;
    b2 = a2;
    a2 = b;
    a2 = t2;
    a2 = t;
})(WithBase || (WithBase = {}));
