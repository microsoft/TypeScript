//// [typeParameterAssignability3.js]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

function foo(t, u) {
    var a;
    var b;
    t = a; // ok
    a = t; // ok

    b = u; // ok
    u = b; // ok

    t = u; // error
    u = t; // error
}

var C = (function () {
    function C() {
        var _this = this;
        this.r = function () {
            _this.t = _this.u; // error
            _this.u = _this.t; // error
        };
    }
    return C;
})();
