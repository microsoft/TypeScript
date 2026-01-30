//// [tests/cases/compiler/visSyntax.ts] ////

//// [visSyntax.ts]
namespace M {
    export class C {
    }

    export interface I {
	
    }

    export var x=10;
}


//// [visSyntax.js]
"use strict";
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
