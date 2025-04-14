//// [tests/cases/compiler/rectype.ts] ////

//// [rectype.ts]
module M {
    interface I { (i:I):I; }

    export function f(p: I) { return f };

    var i:I;

    f(i);
    f(f(i));
    f((f(f(i))));
}



//// [rectype.js]
var M;
(function (M) {
    function f(p) { return f; }
    M.f = f;
    ;
    var i;
    f(i);
    f(f(i));
    f((f(f(i))));
})(M || (M = {}));
