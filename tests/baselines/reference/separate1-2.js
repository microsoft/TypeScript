//// [separate1-2.ts]
module X {
    export function f() { }
}

//// [separate1-2.js]
var X = X || (X = {});
(function (X) {
    function f() { }
    X.f = f;
})(X);
