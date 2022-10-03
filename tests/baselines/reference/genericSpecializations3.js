//// [genericSpecializations3.ts]
interface IFoo<T> {
    foo(x: T): T;
}

var iFoo: IFoo<number>;
iFoo.foo(1);

class IntFooBad implements IFoo<number> { // error
    foo(x: string): string { return null; }
}

var intFooBad: IntFooBad;

class IntFoo implements IFoo<number> {
    foo(x: number): number { return null; }
}

var intFoo: IntFoo;

class StringFoo2 implements IFoo<string> {
    foo(x: string): string { return null; }
}

var stringFoo2: StringFoo2;
stringFoo2.foo("hm");


intFoo = stringFoo2; // error
stringFoo2 = intFoo; // error


class StringFoo3 implements IFoo<string> { // error
    foo<T>(x: T): T { return null; }
}
var stringFoo3: StringFoo3;

//// [genericSpecializations3.js]
var iFoo;
iFoo.foo(1);
var IntFooBad = /** @class */ (function () {
    function IntFooBad() {
    }
    IntFooBad.prototype.foo = function (x) { return null; };
    return IntFooBad;
}());
var intFooBad;
var IntFoo = /** @class */ (function () {
    function IntFoo() {
    }
    IntFoo.prototype.foo = function (x) { return null; };
    return IntFoo;
}());
var intFoo;
var StringFoo2 = /** @class */ (function () {
    function StringFoo2() {
    }
    StringFoo2.prototype.foo = function (x) { return null; };
    return StringFoo2;
}());
var stringFoo2;
stringFoo2.foo("hm");
intFoo = stringFoo2; // error
stringFoo2 = intFoo; // error
var StringFoo3 = /** @class */ (function () {
    function StringFoo3() {
    }
    StringFoo3.prototype.foo = function (x) { return null; };
    return StringFoo3;
}());
var stringFoo3;
