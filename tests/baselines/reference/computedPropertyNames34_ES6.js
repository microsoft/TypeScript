//// [computedPropertyNames34_ES6.ts]
function foo<T>() { return '' }
class C<T> {
    static bar() {
        var obj = {
            [foo<T>()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames34_ES6.js]
function foo() {
    return '';
}
var C = (function () {
    function C() {
    }
    C.bar = function () {
        var obj = {
            [foo()]() {
            }
        };
        return 0;
    };
    return C;
})();
