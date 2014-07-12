//// [subtypingWithObjectMembers4.ts]
// subtyping when property names do not match

class Base {
    foo: string;
}

class Derived extends Base {
    bar: string;
}

class A {
    foo: Base;
}

class B extends A {
    fooo: Derived; // ok, inherits foo
}

class A2 {
    1: Base; 
}

class B2 extends A2 {
    1.1: Derived; // ok, inherits 1
}

class A3 {
    '1': Base;
}

class B3 extends A3 {
    '1.1': Derived; // ok, inherits '1'
}

//// [subtypingWithObjectMembers4.js]
// subtyping when property names do not match
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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

var A = (function () {
    function A() {
    }
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);

var A2 = (function () {
    function A2() {
    }
    return A2;
})();

var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    return B2;
})(A2);

var A3 = (function () {
    function A3() {
    }
    return A3;
})();

var B3 = (function (_super) {
    __extends(B3, _super);
    function B3() {
        _super.apply(this, arguments);
    }
    return B3;
})(A3);
