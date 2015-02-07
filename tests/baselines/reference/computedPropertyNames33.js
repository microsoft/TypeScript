//// [computedPropertyNames33.ts]
function foo<T>() { return '' }
class C<T> {
    bar() {
        var obj = {
            [foo<T>()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames33.js]
function foo() { return ''; }
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var obj = {
            [foo()]() { }
        };
        return 0;
    };
    return C;
})();
