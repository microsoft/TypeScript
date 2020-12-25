//// [propertyAccessOnTypeParameterWithConstraints2.ts]
// generic types should behave as if they have properties of their constraint type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string {
        return '';
    }
}

class C<U extends A, T extends A> {
    f() {
        var x: U;
        var a = x['foo'](); // should be string
        return a + x.foo();
    }

    g(x: U) {
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}
//class C<U extends T, T extends A> {
//    f() {
//        var x: U;
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }

//    g(x: U) {
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }
//}

var r1 = (new C<B, A>()).f();
var r1b = (new C<B, A>()).g(new B());

interface I<U extends A, T extends A> {
    foo: U;
}
//interface I<U extends T, T extends A> {
//    foo: U;
//}
var i: I<B, A>;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();

var a: {
    <U extends A, T extends A>(): U;
    <U extends A, T extends A>(x: U): U;
    <U extends A, T extends A>(x: U, y: T): U;
}
//var a: {
//    <U extends T, T extends A>(): U;
//    <U extends T, T extends A>(x: U): U;
//    <U extends T, T extends A>(x: U, y: T): U;
//}
var r3 = a<A, A>().foo(); 
var r3b = a()['foo']();
// parameter supplied for type argument inference to succeed
var aB = new B();
var r3c = a(aB, aB).foo(); 
var r3d = a(aB, aB)['foo']();

var b = {
    foo: <U extends A, T extends A>(x: U, y: T) => {
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}
//var b = {
//    foo: <U extends T, T extends A>(x: U, y: T) => {
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }
//}

var r4 = b.foo(aB, aB); // no inferences for T so constraint isn't satisfied, error

//// [propertyAccessOnTypeParameterWithConstraints2.js]
// generic types should behave as if they have properties of their constraint type
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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { return ''; };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.bar = function () {
        return '';
    };
    return B;
}(A));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['foo'](); // should be string
        return a + x.foo();
    };
    C.prototype.g = function (x) {
        var a = x['foo'](); // should be string
        return a + x.foo();
    };
    return C;
}());
//class C<U extends T, T extends A> {
//    f() {
//        var x: U;
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }
//    g(x: U) {
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }
//}
var r1 = (new C()).f();
var r1b = (new C()).g(new B());
//interface I<U extends T, T extends A> {
//    foo: U;
//}
var i;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();
var a;
//var a: {
//    <U extends T, T extends A>(): U;
//    <U extends T, T extends A>(x: U): U;
//    <U extends T, T extends A>(x: U, y: T): U;
//}
var r3 = a().foo();
var r3b = a()['foo']();
// parameter supplied for type argument inference to succeed
var aB = new B();
var r3c = a(aB, aB).foo();
var r3d = a(aB, aB)['foo']();
var b = {
    foo: function (x, y) {
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
};
//var b = {
//    foo: <U extends T, T extends A>(x: U, y: T) => {
//        var a = x['foo'](); // should be string
//        return a + x.foo();
//    }
//}
var r4 = b.foo(aB, aB); // no inferences for T so constraint isn't satisfied, error
