//// [tests/cases/compiler/thisBinding.ts] ////

//// [thisBinding.ts]
namespace M {
    export interface I {
	z;
    }

    export class C {
	public x=0;
	f(x:I) {
	    x.e;  // e not found
	    x.z;  // ok 
	}
    constructor() {
	({z:10,f:this.f}).f(<I>({}));
    }
    }
}

class C {
    f(x: number) {
    }
}

//// [thisBinding.js]
"use strict";
var M;
(function (M) {
    class C {
        x = 0;
        f(x) {
            x.e; // e not found
            x.z; // ok 
        }
        constructor() {
            ({ z: 10, f: this.f }).f(({}));
        }
    }
    M.C = C;
})(M || (M = {}));
class C {
    f(x) {
    }
}
