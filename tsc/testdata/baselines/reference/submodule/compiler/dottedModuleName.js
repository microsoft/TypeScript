//// [tests/cases/compiler/dottedModuleName.ts] ////

//// [dottedModuleName.ts]
namespace M {
    export namespace N {
	export function f(x:number)=>2*x;
	export namespace X.Y.Z {
	    export var v2=f(v);
	}
    }
}



namespace M.N {
    export namespace X {
	export namespace Y.Z {
	    export var v=f(10);
	}
    }
}


//// [dottedModuleName.js]
"use strict";
var M;
(function (M) {
    let N;
    (function (N) {
        function f(x) { }
        N.f = f;
        2 * x;
        let X;
        (function (X) {
            let Y;
            (function (Y) {
                let Z;
                (function (Z) {
                    Z.v2 = f(v);
                })(Z = Y.Z || (Y.Z = {}));
            })(Y = X.Y || (X.Y = {}));
        })(X = N.X || (N.X = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    let N;
    (function (N) {
        let X;
        (function (X) {
            let Y;
            (function (Y) {
                let Z;
                (function (Z) {
                    Z.v = f(10);
                })(Z = Y.Z || (Y.Z = {}));
            })(Y = X.Y || (X.Y = {}));
        })(X = N.X || (N.X = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
