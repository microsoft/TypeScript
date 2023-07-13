//// [tests/cases/compiler/dottedModuleName.ts] ////

//// [dottedModuleName.ts]
module M {
    export module N {
	export function f(x:number)=>2*x;
	export module X.Y.Z {
	    export var v2=f(v);
	}
    }
}



module M.N {
    export module X {
	export module Y.Z {
	    export var v=f(10);
	}
    }
}


//// [dottedModuleName.js]
var M;
(function (M) {
    var N;
    (function (N) {
        2 * x;
        var X;
        (function (X) {
            var Y;
            (function (Y) {
                var Z;
                (function (Z) {
                    Z.v2 = f(Z.v);
                })(Z = Y.Z || (Y.Z = {}));
            })(Y = X.Y || (X.Y = {}));
        })(X = N.X || (N.X = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    var N;
    (function (N) {
        var X;
        (function (X) {
            var Y;
            (function (Y) {
                var Z;
                (function (Z) {
                    Z.v = N.f(10);
                })(Z = Y.Z || (Y.Z = {}));
            })(Y = X.Y || (X.Y = {}));
        })(X = N.X || (N.X = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
