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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.myFunc = function (arg) { };
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.myFunc = function (arg) { };
    return Bar;
}());
var myVar = new Bar();
