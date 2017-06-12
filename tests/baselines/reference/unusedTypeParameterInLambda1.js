//// [unusedTypeParameterInLambda1.ts]
class A {
    public f1() {
        return <T>() => {

        }
    }
}

//// [unusedTypeParameterInLambda1.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.f1 = function () {
        return function () {
        };
    };
    return A;
}());
