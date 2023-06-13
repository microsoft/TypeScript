//// [tests/cases/compiler/undeclaredMethod.ts] ////

//// [undeclaredMethod.ts]
module M {
    export class C {
        public salt() {}
    }
}

var c:M.C = new M.C();

c.salt();	// cool
c.saltbar();	// crash



//// [undeclaredMethod.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.salt = function () { };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var c = new M.C();
c.salt(); // cool
c.saltbar(); // crash
