//// [strictModeCode1.ts]
interface public { }

class Foo {
    constructor(private, public, static) {
        private = public = static;
    }
    public banana(x: public) { }
}

class C {
    constructor(public public, let) {
    }
    foo1(private, static, public) {
        function let() { }
        var z = function let() { };
    }

    public pulbic() { } // No Error;
}

class D<public, private>{ }

class E implements public { }

//// [strictModeCode1.js]
var Foo = (function () {
    function Foo(private, public, static) {
        private = public = static;
    }
    Foo.prototype.banana = function (x) { };
    return Foo;
})();
var C = (function () {
    function C(public, let) {
        this.public = public;
    }
    C.prototype.foo1 = function (private, static, public) {
        function let() { }
        var z = function let() { };
    };
    C.prototype.pulbic = function () { }; // No Error;
    return C;
})();
var D = (function () {
    function D() {
    }
    return D;
})();
var E = (function () {
    function E() {
    }
    return E;
})();
