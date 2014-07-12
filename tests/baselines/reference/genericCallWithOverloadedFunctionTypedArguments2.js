//// [genericCallWithOverloadedFunctionTypedArguments2.js]
// Function typed arguments with multiple signatures must be passed an implementation that matches all of them
// Inferences are made quadratic-pairwise to and from these overload sets
var NonGenericParameter;
(function (NonGenericParameter) {
    var a;

    function foo4(cb) {
        return cb;
    }

    var r3 = foo4(function (x) {
        var r;
        return r;
    });
})(NonGenericParameter || (NonGenericParameter = {}));

var GenericParameter;
(function (GenericParameter) {
    function foo5(cb) {
        return cb;
    }

    var r6 = foo5(function (x) {
        return x;
    });

    function foo6(cb) {
        return cb;
    }

    var r10 = foo6(function (x, y) {
        return '';
    });

    function foo7(x, cb) {
        return cb;
    }

    var r13 = foo7(1, function (x) {
        return x;
    });
    var a;
    var r14 = foo7(1, a);
})(GenericParameter || (GenericParameter = {}));
