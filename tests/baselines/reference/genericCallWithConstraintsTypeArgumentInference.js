//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithConstraintsTypeArgumentInference.ts] ////

//// [genericCallWithConstraintsTypeArgumentInference.ts]
// Basic type inference with generic calls and constraints, no errors expected

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }
var b: Base;
var d1: Derived;
var d2: Derived2;

function foo<T extends Base>(t: T) {
    return t;
}

var r = foo(b); // Base
var r2 = foo(d1); // Derived

function foo2<T extends Base, U extends Derived>(t: T, u: U) {
    return u;
}

function foo2b<T extends Base, U extends Derived>(u: U) {
    var x: T;
    return x;
}

function foo2c<T extends Base, U extends Derived>() {
    var x: T;
    return x;
}

var r3 = foo2b(d1); // Base
var r3b = foo2c(); // Base

class C<T extends Base, U extends Derived> {
    constructor(public t: T, public u: U) {
    }

    foo(t: T, u: U) {
        return t;
    }

    foo2(t: T, u: U) {
        return u;
    }

    foo3<T extends Derived>(t: T, u: U) {
        return t;
    }

    foo4<U extends Derived2>(t: T, u: U) {
        return t;
    }

    foo5<T extends Derived, U extends Derived2>(t: T, u: U) {
        return t;
    }

    foo6<T extends Derived, U extends Derived2>() {
        var x: T;
        return x;
    }

    foo7<T extends Base, U extends Derived>(u: U) {
        var x: T;
        return x;
    }

    foo8<T extends Base, U extends Derived>() {
        var x: T;
        return x;
    }
}

var c = new C(b, d1);
var r4 = c.foo(d1, d2); // Base
var r5 = c.foo2(b, d2); // Derived
var r6 = c.foo3(d1, d1); // Derived
var r7 = c.foo4(d1, d2); // Base
var r8 = c.foo5(d1, d2); // Derived
var r8b = c.foo5(d2, d2); // Derived2
var r9 = c.foo6(); // Derived
var r10 = c.foo7(d1); // Base
var r11 = c.foo8(); // Base

interface I<T extends Base, U extends Derived> {
    new (t: T, u: U);
    foo(t: T, u: U): T;
    foo2(t: T, u: U): U;
    foo3<T extends Derived>(t: T, u: U): T;
    foo4<U extends Derived2>(t: T, u: U): T;
    foo5<T extends Derived, U extends Derived2>(t: T, u: U): T;
    foo6<T extends Derived, U extends Derived2>(): T;
    foo7<T extends Base, U extends Derived>(u: U): T;
    foo8<T extends Base, U extends Derived>(): T;
}

var i: I<Base, Derived>;
var r4 = i.foo(d1, d2); // Base
var r5 = i.foo2(b, d2); // Derived
var r6 = i.foo3(d1, d1); // Derived
var r7 = i.foo4(d1, d2); // Base
var r8 = i.foo5(d1, d2); // Derived
var r8b = i.foo5(d2, d2); // Derived2
var r9 = i.foo6(); // Derived
var r10 = i.foo7(d1); // Base
var r11 = i.foo8(); // Base


//// [genericCallWithConstraintsTypeArgumentInference.js]
// Basic type inference with generic calls and constraints, no errors expected
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
}(Derived));
var b;
var d1;
var d2;
function foo(t) {
    return t;
}
var r = foo(b); // Base
var r2 = foo(d1); // Derived
function foo2(t, u) {
    return u;
}
function foo2b(u) {
    var x;
    return x;
}
function foo2c() {
    var x;
    return x;
}
var r3 = foo2b(d1); // Base
var r3b = foo2c(); // Base
var C = /** @class */ (function () {
    function C(t, u) {
        this.t = t;
        this.u = u;
    }
    C.prototype.foo = function (t, u) {
        return t;
    };
    C.prototype.foo2 = function (t, u) {
        return u;
    };
    C.prototype.foo3 = function (t, u) {
        return t;
    };
    C.prototype.foo4 = function (t, u) {
        return t;
    };
    C.prototype.foo5 = function (t, u) {
        return t;
    };
    C.prototype.foo6 = function () {
        var x;
        return x;
    };
    C.prototype.foo7 = function (u) {
        var x;
        return x;
    };
    C.prototype.foo8 = function () {
        var x;
        return x;
    };
    return C;
}());
var c = new C(b, d1);
var r4 = c.foo(d1, d2); // Base
var r5 = c.foo2(b, d2); // Derived
var r6 = c.foo3(d1, d1); // Derived
var r7 = c.foo4(d1, d2); // Base
var r8 = c.foo5(d1, d2); // Derived
var r8b = c.foo5(d2, d2); // Derived2
var r9 = c.foo6(); // Derived
var r10 = c.foo7(d1); // Base
var r11 = c.foo8(); // Base
var i;
var r4 = i.foo(d1, d2); // Base
var r5 = i.foo2(b, d2); // Derived
var r6 = i.foo3(d1, d1); // Derived
var r7 = i.foo4(d1, d2); // Base
var r8 = i.foo5(d1, d2); // Derived
var r8b = i.foo5(d2, d2); // Derived2
var r9 = i.foo6(); // Derived
var r10 = i.foo7(d1); // Base
var r11 = i.foo8(); // Base
