//// [tests/cases/compiler/structural1.ts] ////

//// [structural1.ts]
module M {
    export interface I {
        salt:number;
        pepper:number;
    }

    export function f(i:I) {
    }

    f({salt:2,pepper:0});
}


//// [structural1.js]
var M;
(function (M) {
    function f(i) {
    }
    M.f = f;
    f({ salt: 2, pepper: 0 });
})(M || (M = {}));
