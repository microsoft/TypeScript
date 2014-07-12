module M {
    export var m=0;
    export module N {
        export var n=1;
    }
}

module M {
    export module N {
        var y=m;
        var x=n+y;
    }
}


module T {
    export interface I {
        p;
    }
    export module U {
        var z:I=3;
        export interface I2 {
            q;
        }
    }
}

module Peer {
    export module U2 {
        var z:T.U.I2=3;
    }
}

module Everest {
    export module K1 {
        export interface I3 {
            zeep;
        }
    }
    export module K2 {
        export interface I4 {
            z;
        }
        var v1:I4;
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

var y:I;
var x:T.I=y;

