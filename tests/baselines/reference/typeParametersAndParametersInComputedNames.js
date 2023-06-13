//// [tests/cases/compiler/typeParametersAndParametersInComputedNames.ts] ////

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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype[foo(a)] = function (a) {
    };
    return A;
}());
