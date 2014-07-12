//// [genericCallWithOverloadedConstructorTypedArguments2.js]
// Function typed arguments with multiple signatures must be passed an implementation that matches all of them
// Inferences are made quadratic-pairwise to and from these overload sets
var NonGenericParameter;
(function (NonGenericParameter) {
    var a;

    function foo4(cb) {
        return cb;
    }

    var b;
    var r3 = foo4(b);
})(NonGenericParameter || (NonGenericParameter = {}));

var GenericParameter;
(function (GenericParameter) {
    function foo5(cb) {
        return cb;
    }

    var a;
    var r6 = foo5(a);

    function foo6(cb) {
        return cb;
    }

    var b;
    var r10 = foo6(b);

    function foo7(x, cb) {
        return cb;
    }

    var r13 = foo7(1, a);
    var c;
    var r14 = foo7(1, c);
})(GenericParameter || (GenericParameter = {}));
