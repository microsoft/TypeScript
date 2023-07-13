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
    var XX = /** @class */ (function () {
        function XX(m1) {
            this.m1 = m1;
        }
        return XX;
    }());
    M.XX = XX;
    function f(y) { }
    M.f = f;
    var a;
    f({ x: a }); // ok
    var b;
    f({ x: b }); // ok covariant subtype
})(M || (M = {}));
