//// [tests/cases/compiler/augmentedTypesClass4.ts] ////

//// [augmentedTypesClass4.ts]
//// class then class
class c3 { public foo() { } } // error
class c3 { public bar() { } } // error


//// [augmentedTypesClass4.js]
//// class then class
var c3 = /** @class */ (function () {
    function c3() {
    }
    c3.prototype.foo = function () { };
    return c3;
}()); // error
var c3 = /** @class */ (function () {
    function c3() {
    }
    c3.prototype.bar = function () { };
    return c3;
}()); // error
