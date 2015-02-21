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

<<<<<<< HEAD:tests/baselines/reference/computedPropertyNames34.js
//// [computedPropertyNames34.js]
function foo() { return ''; }
=======
//// [computedPropertyNames34_ES6.js]
function foo() {
    return '';
}
>>>>>>> master:tests/baselines/reference/computedPropertyNames34_ES6.js
var C = (function () {
    function C() {
    }
    C.bar = function () {
        var obj = {
            [foo()]() { }
        };
        return 0;
    };
    return C;
})();
