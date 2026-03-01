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
    class C {
    }
    M.C = C;
    M.x = 10;
})(M || (M = {}));
