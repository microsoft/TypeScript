//// [thisBinding.ts]
module M {
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
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
            this.x = 0;
            ({ z: 10, f: this.f }).f(({}));
        }
        C.prototype.f = function (x) {
            x.e; // e not found
            x.z; // ok 
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function (x) {
    };
    return C;
}());
