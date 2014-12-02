//// [overloadGenericFunctionWithRestArgs.ts]
class B<V>{
    private id: V;
}
class A<U>{
    GetEnumerator: () => B<U>;
}
function Choice<T>(...v_args: T[]): A<T>;
function Choice<T>(...v_args: T[]): A<T> {
    return new A<T>();
}

//// [overloadGenericFunctionWithRestArgs.js]
var B = (function () {
    function B() {
    }
    return B;
})();
var A = (function () {
    function A() {
    }
    return A;
})();
function Choice() {
    var v_args = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        v_args[_a - 0] = arguments[_a];
    }
    return new A();
}
