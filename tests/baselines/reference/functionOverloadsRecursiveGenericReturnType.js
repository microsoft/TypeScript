//// [tests/cases/compiler/functionOverloadsRecursiveGenericReturnType.ts] ////

//// [functionOverloadsRecursiveGenericReturnType.ts]
class B<V>{
    private id: V;
}

class A<U>{
    GetEnumerator: () => B<U>;
}

function Choice<T>(args: T[]): A<T>;
function Choice<T>(...v_args: T[]): A<T>;
function Choice<T>(...v_args: any[]): A<T>{
    return new A<T>();
}


//// [functionOverloadsRecursiveGenericReturnType.js]
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
function Choice() {
    var v_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v_args[_i] = arguments[_i];
    }
    return new A();
}
