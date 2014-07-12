//// [genericCallWithGenericSignatureArguments2.js]
// When a function expression is inferentially typed (section 4.9.3) and a type assigned to a parameter in that expression references type parameters for which inferences are being made,
// the corresponding inferred type arguments to become fixed and no further candidate inferences are made for them.
function foo(a, b) {
    var r;
    return r;
}

var r1 = foo(function (x) {
    return 1;
}, function (x) {
    return '';
});

function other2(x) {
    var r7 = foo(function (a) {
        return a;
    }, function (b) {
        return b;
    });

    // BUG 835518
    var r9 = r7(new Date());
    var r10 = r7(1);
}

function foo2(a, b) {
    var r;
    return r;
}

function other3(x) {
    var r7 = foo2(function (a) {
        return a;
    }, function (b) {
        return b;
    });
    var r7b = foo2(function (a) {
        return a;
    }, function (b) {
        return b;
    });
}

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var F;
(function (F) {
    F[F["A"] = 0] = "A";
})(F || (F = {}));

function foo3(x, a, b) {
    var r;
    return r;
}

var r7 = foo3(0 /* A */, function (x) {
    return 0 /* A */;
}, function (x) {
    return 0 /* A */;
}); // error
