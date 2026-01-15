//// [tests/cases/compiler/qualify.ts] ////

//// [qualify.ts]
namespace M {
    export var m=0;
    export namespace N {
        export var n=1;
    }
}

namespace M {
    export namespace N {
        var y=m;
        var x=n+y;
    }
}


namespace T {
    export interface I {
        p;
    }
    export namespace U {
        var z:I=3;
        export interface I2 {
            q;
        }
    }
}

namespace Peer {
    export namespace U2 {
        var z:T.U.I2=3;
    }
}

namespace Everest {
    export namespace K1 {
        export interface I3 {
            zeep;
        }
    }
    export namespace K2 {
        export interface I4 {
            z;
        }
        var v1:I4 = undefined as any;
        var v2:K1.I3=v1;
        var v3:K1.I3[]=v1;
        var v4:()=>K1.I3=v1;
        var v5:(k:K1.I3)=>void=v1;
        var v6:{k:K1.I3;}=v1;
    }
}

interface I {
    k;
}

var y:I = undefined as any;
var x:T.I=y;



//// [qualify.js]
var M;
(function (M) {
    M.m = 0;
    var N;
    (function (N) {
        N.n = 1;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    var N;
    (function (N) {
        var y = M.m;
        var x = N.n + y;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
var T;
(function (T) {
    var U;
    (function (U) {
        var z = 3;
    })(U = T.U || (T.U = {}));
})(T || (T = {}));
var Peer;
(function (Peer) {
    var U2;
    (function (U2) {
        var z = 3;
    })(U2 = Peer.U2 || (Peer.U2 = {}));
})(Peer || (Peer = {}));
var Everest;
(function (Everest) {
    var K2;
    (function (K2) {
        var v1 = undefined;
        var v2 = v1;
        var v3 = v1;
        var v4 = v1;
        var v5 = v1;
        var v6 = v1;
    })(K2 = Everest.K2 || (Everest.K2 = {}));
})(Everest || (Everest = {}));
var y = undefined;
var x = y;
