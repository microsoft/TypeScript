//// [propertyAccessOnTypeParameterWithConstraints5.ts]
class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string {
        return '';
    }
}

class C<U extends T, T extends A> {
    f() {
        var x: U;
        var a = x['foo'](); // should be string
        return a + x.foo() + x.notHere();
    }
}

var r = (new C<B, A>()).f();

interface I<U extends T, T extends A> {
    foo: U;
}
var i: I<B, A>;
var r2 = i.foo.notHere();
var r2b = i.foo['foo']();

var a: {
    <U extends T, T extends A>(): U;
}
// BUG 794164
var r3: string = a().notHere();
var r3b: string = a()['foo']();

var b = {
    foo: <U extends T, T extends A>(x: U): U => {
        var a = x['foo'](); // should be string
        return a + x.notHere();
    },
    // BUG 794164
    bar: b.foo(1).notHere()
}

var r4 = b.foo(new B()); // error after constraints above made illegal, doesn't matter

//// [propertyAccessOnTypeParameterWithConstraints5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { return ''; };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () {
        return '';
    };
    return B;
}(A));
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['foo'](); // should be string
        return a + x.foo() + x.notHere();
    };
    return C;
}());
var r = (new C()).f();
var i;
var r2 = i.foo.notHere();
var r2b = i.foo['foo']();
var a;
// BUG 794164
var r3 = a().notHere();
var r3b = a()['foo']();
var b = {
    foo: function (x) {
        var a = x['foo'](); // should be string
        return a + x.notHere();
    },
    // BUG 794164
    bar: b.foo(1).notHere()
};
var r4 = b.foo(new B()); // error after constraints above made illegal, doesn't matter
