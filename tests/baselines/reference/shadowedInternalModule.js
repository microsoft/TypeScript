//// [tests/cases/conformance/internalModules/importDeclarations/shadowedInternalModule.ts] ////

//// [shadowedInternalModule.ts]
// all errors imported modules conflict with local variables

namespace A {
    export var Point = { x: 0, y: 0 }
    export interface Point {
        x: number;
        y: number;
    }
} 

namespace B {
    var A = { x: 0, y: 0 };
    import Point = A;
}

namespace X {
    export namespace Y {
        export interface Point{
            x: number;
            y: number
        }
    }

    export class Y {
        name: string;
    }
}

namespace Z {
    import Y = X.Y;

    var Y = 12;
}

//

namespace a {
  export type A = number;
}

namespace b {
  export import A = a.A;
  export namespace A {}
}

namespace c {
  import any = b.A;
}

//

namespace q {
  export const Q = {};
}

namespace r {
  export import Q = q.Q;
  export type Q = number;
}

namespace s {
  import Q = r.Q;
  const Q = 0;
}


//// [shadowedInternalModule.js]
// all errors imported modules conflict with local variables
var A;
(function (A) {
    A.Point = { x: 0, y: 0 };
})(A || (A = {}));
var B;
(function (B) {
    var A = { x: 0, y: 0 };
})(B || (B = {}));
var X;
(function (X) {
    var Y = /** @class */ (function () {
        function Y() {
        }
        return Y;
    }());
    X.Y = Y;
})(X || (X = {}));
var Z;
(function (Z) {
    var Y = 12;
})(Z || (Z = {}));
var b;
(function (b) {
})(b || (b = {}));
//
var q;
(function (q) {
    q.Q = {};
})(q || (q = {}));
var r;
(function (r) {
    r.Q = q.Q;
})(r || (r = {}));
var s;
(function (s) {
    var Q = 0;
})(s || (s = {}));
