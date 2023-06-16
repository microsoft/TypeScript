//// [tests/cases/compiler/genericSpecializations2.ts] ////

//// [genericSpecializations2.ts]
class IFoo<T> {
    foo<T>(x: T): T { // no error on implementors because IFoo's T is different from foo's T
        return null;
    }
}

class IntFooBad implements IFoo<number> {
    foo<string>(x: string): string { return null; }
}

class StringFoo2 implements IFoo<string> {
    foo<string>(x: string): string { return null; }
}

class StringFoo3 implements IFoo<string> {
    foo<T>(x: T): T { return null; }
}



//// [genericSpecializations2.js]
var IFoo = /** @class */ (function () {
    function IFoo() {
    }
    IFoo.prototype.foo = function (x) {
        return null;
    };
    return IFoo;
}());
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
