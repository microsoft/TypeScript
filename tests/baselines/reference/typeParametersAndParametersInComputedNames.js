//// [typeParametersAndParametersInComputedNames.ts]
function foo<T>(a: T) : string {
    return "";
}

class A {
    [foo<T>(a)]<T>(a: T) {  
    }
}

//// [typeParametersAndParametersInComputedNames.js]
function foo(a) {
    return "";
}
var A = (function () {
    function A() {
    }
    A.prototype[foo(a)] = function (a) {
    };
    return A;
}());
