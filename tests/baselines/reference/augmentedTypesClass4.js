//// [augmentedTypesClass4.ts]
//// class then class
class c3 { public foo() { } } // error
class c3 { public bar() { } } // error


//// [augmentedTypesClass4.js]
//// class then class
var c3 = (function () {
    function c3() {
    }
    var proto_1 = c3.prototype;
    proto_1.foo = function () { };
    return c3;
}()); // error
var c3 = (function () {
    function c3() {
    }
    var proto_2 = c3.prototype;
    proto_2.bar = function () { };
    return c3;
}()); // error
