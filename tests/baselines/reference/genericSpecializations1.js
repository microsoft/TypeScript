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
var IntFooBad = (function () {
    function IntFooBad() {
    }
    IntFooBad.prototype.foo = function (x) { return null; };
    __names(IntFooBad.prototype, ["foo"]);
    return IntFooBad;
}());
var StringFoo2 = (function () {
    function StringFoo2() {
    }
    StringFoo2.prototype.foo = function (x) { return null; };
    __names(StringFoo2.prototype, ["foo"]);
    return StringFoo2;
}());
var StringFoo3 = (function () {
    function StringFoo3() {
    }
    StringFoo3.prototype.foo = function (x) { return null; };
    __names(StringFoo3.prototype, ["foo"]);
    return StringFoo3;
}());
