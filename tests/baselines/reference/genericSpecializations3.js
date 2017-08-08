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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var iFoo;
iFoo.foo(1);
var IntFooBad = (function () {
    function IntFooBad() {
    }
    IntFooBad.prototype.foo = function (x) { return null; };
    __names(IntFooBad.prototype, ["foo"]);
    return IntFooBad;
}());
var intFooBad;
var IntFoo = (function () {
    function IntFoo() {
    }
    IntFoo.prototype.foo = function (x) { return null; };
    __names(IntFoo.prototype, ["foo"]);
    return IntFoo;
}());
var intFoo;
var StringFoo2 = (function () {
    function StringFoo2() {
    }
    StringFoo2.prototype.foo = function (x) { return null; };
    __names(StringFoo2.prototype, ["foo"]);
    return StringFoo2;
}());
var stringFoo2;
stringFoo2.foo("hm");
intFoo = stringFoo2; // error
stringFoo2 = intFoo; // error
var StringFoo3 = (function () {
    function StringFoo3() {
    }
    StringFoo3.prototype.foo = function (x) { return null; };
    __names(StringFoo3.prototype, ["foo"]);
    return StringFoo3;
}());
var stringFoo3;
