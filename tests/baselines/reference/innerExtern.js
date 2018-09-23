//// [innerExtern.ts]
module A {
    export declare module BB {
        export var Elephant;
    }
    export module B {
        export class C {
            x = BB.Elephant.X;
        }
    }
}




//// [innerExtern.js]
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        var C = /** @class */ (function () {
            function C() {
                this.x = BB.Elephant.X;
            }
            return C;
        }());
        B.C = C;
    })(B);
})(A);
