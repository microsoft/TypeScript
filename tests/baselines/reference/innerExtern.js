//// [tests/cases/compiler/innerExtern.ts] ////

//// [innerExtern.ts]
namespace A {
    export declare namespace BB {
        export var Elephant;
    }
    export namespace B {
        export class C {
            x = BB.Elephant.X;
        }
    }
}




//// [innerExtern.js]
var A;
(function (A) {
    var B;
    (function (B) {
        var C = /** @class */ (function () {
            function C() {
                this.x = BB.Elephant.X;
            }
            return C;
        }());
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
