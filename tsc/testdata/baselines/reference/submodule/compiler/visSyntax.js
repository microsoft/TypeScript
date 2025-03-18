//// [tests/cases/compiler/visSyntax.ts] ////

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
    class C {
    }
    M.C = C;
    M.x = 10;
})(M || (M = {}));
