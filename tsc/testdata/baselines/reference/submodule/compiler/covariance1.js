//// [tests/cases/compiler/covariance1.ts] ////

//// [covariance1.ts]
module M {

    interface X { m1:number; }
    export class XX implements X { constructor(public m1:number) { } }

    interface Y { x:X; }

    export function f(y:Y) { }

    var a:X;
    f({x:a}); // ok

    var b:XX;
    f({x:b}); // ok covariant subtype
}



//// [covariance1.js]
var M;
(function (M) {
    class XX {
        m1;
        constructor(m1) {
            this.m1 = m1;
        }
    }
    M.XX = XX;
    function f(y) { }
    M.f = f;
    var a;
    f({ x: a });
    var b;
    f({ x: b });
})(M || (M = {}));
