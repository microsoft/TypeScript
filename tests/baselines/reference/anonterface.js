//// [tests/cases/compiler/anonterface.ts] ////

//// [anonterface.ts]
module M {
    export class C {
        m(fn:{ (n:number):string; },n2:number):string {
            return fn(n2);
        }
    }
}

var c=new M.C();
c.m(function(n) { return "hello: "+n; },18);





//// [anonterface.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.m = function (fn, n2) {
            return fn(n2);
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var c = new M.C();
c.m(function (n) { return "hello: " + n; }, 18);
