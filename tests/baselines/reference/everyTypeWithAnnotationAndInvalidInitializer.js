//// [everyTypeWithAnnotationAndInvalidInitializer.js]
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function () {
    function D() {
    }
    return D;
})();

function F(x) {
    return 42;
}
function F2(x) {
    return x < 42;
}

var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    M.A = A;

    function F2(x) {
        return x.toString();
    }
    M.F2 = F2;
})(M || (M = {}));

var N;
(function (N) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    N.A = A;

    function F2(x) {
        return x.toString();
    }
    N.F2 = F2;
})(N || (N = {}));

var aNumber = 'this is a string';
var aString = 9.9;
var aDate = 9.9;

var aVoid = 9.9;

var anInterface = new D();
var aClass = new D();
var aGenericClass = new C();
var anObjectLiteral = { id: 'a string' };
var anOtherObjectLiteral = new C();

var aFunction = F2;
var anOtherFunction = F2;
var aLambda = function (x) {
    return 'a string';
};

var aModule = N;
var aClassInModule = new N.A();
var aFunctionInModule = F2;
