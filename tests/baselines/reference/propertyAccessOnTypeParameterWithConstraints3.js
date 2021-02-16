//// [propertyAccessOnTypeParameterWithConstraints3.ts]
// generic types should behave as if they have properties of their constraint type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string {
        return '';
    }
}

class C<U extends A, T extends U> {
    f() {
        var x: T;
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }

    g(x: U) {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}

var r1a = (new C<A, B>()).f();
var r1b = (new C<A, B>()).g(new B());

interface I<U extends A, T extends U> {
    foo: T;
}
var i: I<A, B>;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();

var a: {
    <U extends A, T extends U>(): T;
    <U extends T, T extends A>(x: U): U;
}
var r3 = a().foo(); // error, no inferences for U so it doesn't satisfy constraint
var r3b = a()['foo']();
// parameter supplied for type argument inference for U
var r3c = a(new B()).foo(); // valid call to an invalid function, U is inferred as B, which has a foo
var r3d = a(new B())['foo'](); // valid call to an invalid function, U is inferred as B, which has a foo

var b = {
    foo: <U extends A, T extends U>(x: T) => {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}

var r4 = b.foo(new B()); // valid call to an invalid function

//// [propertyAccessOnTypeParameterWithConstraints3.js]
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
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    };
    C.prototype.g = function (x) {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    };
    return C;
}());
var r1a = (new C()).f();
var r1b = (new C()).g(new B());
var i;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();
var a;
var r3 = a().foo(); // error, no inferences for U so it doesn't satisfy constraint
var r3b = a()['foo']();
// parameter supplied for type argument inference for U
var r3c = a(new B()).foo(); // valid call to an invalid function, U is inferred as B, which has a foo
var r3d = a(new B())['foo'](); // valid call to an invalid function, U is inferred as B, which has a foo
var b = {
    foo: function (x) {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
};
var r4 = b.foo(new B()); // valid call to an invalid function
