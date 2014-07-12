//// [global.ts]
module M {
    export function f(y:number) {
        return x+y;
    }
}

var x=10;
M.f(3);



//// [global.js]
var M;
(function (M) {
    function f(y) {
        return x + y;
    }
    M.f = f;
})(M || (M = {}));
var x = 10;
M.f(3);
