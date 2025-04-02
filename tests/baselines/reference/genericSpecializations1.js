//// [tests/cases/compiler/genericSpecializations1.ts] ////

//// [genericSpecializations1.ts]
interface IFoo<T> {
    foo<T>(x: T): T; // no error on implementors because IFoo's T is different from foo's T
}

class IntFooBad implements IFoo<number> {
    foo(x: string): string { return null; }
}

class StringFoo2 implements IFoo<string> {
    foo(x: string): string { return null; }
}

class StringFoo3 implements IFoo<string> {
    foo<T>(x: T): T { return null; }
}

//// [genericSpecializations1.js]
var IntFooBad = /** @class */ (function () {
    function IntFooBad() {
    }
    IntFooBad.prototype.foo = function (x) { return null; };
    return IntFooBad;
}());
var StringFoo2 = /** @class */ (function () {
    function StringFoo2() {
    }
    StringFoo2.prototype.foo = function (x) { return null; };
    return StringFoo2;
}());
var StringFoo3 = /** @class */ (function () {
    function StringFoo3() {
    }
    StringFoo3.prototype.foo = function (x) { return null; };
    return StringFoo3;
}());
