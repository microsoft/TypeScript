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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () {
        return 0;
    };
    C.prototype[foo()] = function () { };
    return C;
}());
