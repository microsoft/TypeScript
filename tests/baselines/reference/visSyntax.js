//// [visSyntax.ts]
module M {
    export class C {
    }

    export interface I {
	
    }

    export var x=10;
}


//// [visSyntax.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
    M.x = 10;
})(M || (M = {}));
