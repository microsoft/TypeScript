//// [augmentedTypesClass4.ts]
//// class then class
class c3 { public foo() { } }
class c3 { public bar() { } } // error


//// [augmentedTypesClass4.js]
var c3 = (function () {
    function c3() {
    }
    c3.prototype.foo = function () {
    };
    return c3;
})();
var c3 = (function () {
    function c3() {
    }
    c3.prototype.bar = function () {
    };
    return c3;
})();
