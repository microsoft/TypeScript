//// [tests/cases/compiler/undeclaredMethod.ts] ////

//// [undeclaredMethod.ts]
namespace M {
    export class C {
        public salt() {}
    }
}

var c:M.C = new M.C();

c.salt();	// cool
c.saltbar();	// crash



//// [undeclaredMethod.js]
"use strict";
var M;
(function (M) {
    class C {
        salt() { }
    }
    M.C = C;
})(M || (M = {}));
var c = new M.C();
c.salt(); // cool
c.saltbar(); // crash
