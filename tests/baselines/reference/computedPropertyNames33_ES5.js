//// [computedPropertyNames33_ES5.ts]
function foo<T>() { return '' }
class C<T> {
    bar() {
        var obj = {
            [foo<T>()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames33_ES5.js]
function foo() { return ''; }
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var obj = (_a = {},
            _a[foo()] = function () { },
            _a);
        return 0;
        var _a;
    };
    return C;
}());
