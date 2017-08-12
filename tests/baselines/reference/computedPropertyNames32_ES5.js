//// [computedPropertyNames32_ES5.ts]
function foo<T>() { return '' }
class C<T> {
    bar() {
        return 0;
    }
    [foo<T>()]() { }
}

//// [computedPropertyNames32_ES5.js]
function foo() { return ''; }
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function () {
        return 0;
    };
    proto_1[foo()] = function () { };
    return C;
}());
