//// [typeParameterAssignability3.ts]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another

class Foo { foo: string; }

function foo<T extends Foo, U extends Foo>(t: T, u: U) {
    var a: T;
    var b: U;
    t = a; // ok
    a = t; // ok

    b = u; // ok
    u = b; // ok

    t = u; // error
    u = t; // error
}

class C<T extends Foo, U extends Foo> {
    t: T;
    u: U;
    r = () => {
        this.t = this.u; // error
        this.u = this.t; // error
    }
}

//// [typeParameterAssignability3.js]
// type parameters are not assignable to one another unless directly or indirectly constrained to one another
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
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
var C = /** @class */ (function () {
    function C() {
        var _this = this;
        this.r = function () {
            _this.t = _this.u; // error
            _this.u = _this.t; // error
        };
    }
    return C;
}());
