//// [tests/cases/compiler/nestedSelf.ts] ////

//// [nestedSelf.ts]
module M {
 export class C {
   public n = 42;
   public foo() { [1,2,3].map((x) => { return this.n * x; })}
 }
}



//// [nestedSelf.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
            this.n = 42;
        }
        C.prototype.foo = function () {
            var _this = this;
            [1, 2, 3].map(function (x) { return _this.n * x; });
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
