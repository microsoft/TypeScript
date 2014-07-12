//// [moduleImport.ts]
module A.B.C {
	import XYZ = X.Y.Z;
	export function ping(x: number) {
		if (x>0) XYZ.pong (x-1);
	}
}

module X {
	import ABC = A.B.C;
	export function pong(x: number) {
		if (x > 0) ABC.ping(x-1);
	}
}

//// [moduleImport.js]
var A;
(function (A) {
    (function (B) {
        (function (C) {
            var XYZ = X.Y.Z;
            function ping(x) {
                if (x > 0)
                    XYZ.pong(x - 1);
            }
            C.ping = ping;
        })(B.C || (B.C = {}));
        var C = B.C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));
var X;
(function (X) {
    var ABC = A.B.C;
    function pong(x) {
        if (x > 0)
            ABC.ping(x - 1);
    }
    X.pong = pong;
})(X || (X = {}));
