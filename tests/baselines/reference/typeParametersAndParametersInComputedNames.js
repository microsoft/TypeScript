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
    var proto_1 = A.prototype;
    proto_1[foo(a)] = function (a) {
    };
    return A;
}());
