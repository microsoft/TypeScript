//// [augmentedTypesClass2a.ts]
//// class then function
class c2 { public foo() { } } // error
function c2() { } // error
var c2 = () => { }

//// [augmentedTypesClass2a.js]
//// class then function
var c2 = (function () {
    function c2() {
    }
    var proto_1 = c2.prototype;
    proto_1.foo = function () { };
    return c2;
}()); // error
function c2() { } // error
var c2 = function () { };
