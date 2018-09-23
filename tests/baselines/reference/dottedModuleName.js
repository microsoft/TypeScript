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
var M = M || (M = {});
(function (M) {
    var N = M.N || (M.N = {});
    (function (N) {
        2 * x;
        var X = N.X || (N.X = {});
        (function (X) {
            var Y = X.Y || (X.Y = {});
            (function (Y) {
                var Z = Y.Z || (Y.Z = {});
                (function (Z) {
                    Z.v2 = f(Z.v);
                })(Z);
            })(Y);
        })(X);
    })(N);
})(M);
(function (M) {
    var N = M.N || (M.N = {});
    (function (N) {
        var X = N.X || (N.X = {});
        (function (X) {
            var Y = X.Y || (X.Y = {});
            (function (Y) {
                var Z = Y.Z || (Y.Z = {});
                (function (Z) {
                    Z.v = N.f(10);
                })(Z);
            })(Y);
        })(X);
    })(N);
})(M);
