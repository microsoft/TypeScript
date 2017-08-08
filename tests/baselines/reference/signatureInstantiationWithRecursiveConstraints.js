//// [signatureInstantiationWithRecursiveConstraints.ts]
// Repro from #17148

class Foo {
  myFunc<T extends Foo>(arg: T) {}
}

class Bar {
  myFunc<T extends Bar>(arg: T) {}
}

const myVar: Foo = new Bar();


//// [signatureInstantiationWithRecursiveConstraints.js]
"use strict";
// Repro from #17148
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
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.myFunc = function (arg) { };
    __names(Foo.prototype, ["myFunc"]);
    return Foo;
}());
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.myFunc = function (arg) { };
    __names(Bar.prototype, ["myFunc"]);
    return Bar;
}());
var myVar = new Bar();
