//// [tests/cases/compiler/extBaseClass1.ts] ////

//// [extBaseClass1.ts]
module M {
    export class B {
	    public x=10;
    }

    export class C extends B {
    }
}

module M {
    export class C2 extends B {
    }
}

module N {
    export class C3 extends M.B {
    }
}


//// [extBaseClass1.js]
var M;
(function (M) {
    class B {
        x = 10;
    }
    M.B = B;
    class C extends B {
    }
    M.C = C;
})(M || (M = {}));
(function (M) {
    class C2 extends B {
    }
    M.C2 = C2;
})(M || (M = {}));
var N;
(function (N) {
    class C3 extends M.B {
    }
    N.C3 = C3;
})(N || (N = {}));
