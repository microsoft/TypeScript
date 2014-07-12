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
var A;
(function (A) {
    (function (B) {
        var C = (function () {
            function C() {
                this.x = BB.Elephant.X;
            }
            return C;
        })();
        B.C = C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));
