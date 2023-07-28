//// [tests/cases/compiler/unknownSymbols2.ts] ////

//// [unknownSymbols2.ts]
module M {
    var x: asdf;
    var y = x + asdf;
    var z = <asdf>x; // should be an error
    if (asdf) {
    }
    else if (qwerty) {
    }

    try {
    }
    catch (asdf) { // no error
    }

    switch (asdf) {
        case qwerty:
            break;
        default:
            break;
    }

    var a = () => asdf;
    var b = (asdf) => { return qwerty };

    module N {
        var x = 1;
    }
    import c = N;
    import d = asdf;
}

//// [unknownSymbols2.js]
var M;
(function (M) {
    var x;
    var y = x + asdf;
    var z = x; // should be an error
    if (asdf) {
    }
    else if (qwerty) {
    }
    try {
    }
    catch (asdf) { // no error
    }
    switch (asdf) {
        case qwerty:
            break;
        default:
            break;
    }
    var a = function () { return asdf; };
    var b = function (asdf) { return qwerty; };
    var N;
    (function (N) {
        var x = 1;
    })(N || (N = {}));
})(M || (M = {}));
