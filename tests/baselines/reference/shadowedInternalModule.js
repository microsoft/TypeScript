//// [tests/cases/conformance/internalModules/importDeclarations/shadowedInternalModule.ts] ////

//// [shadowedInternalModule.ts]
// all errors imported modules conflict with local variables

module A {
    export var Point = { x: 0, y: 0 }
    export interface Point {
        x: number;
        y: number;
    }
} 

module B {
    var A = { x: 0, y: 0 };
    import Point = A;
}

module X {
    export module Y {
        export interface Point{
            x: number;
            y: number
        }
    }

    export class Y {
        name: string;
    }
}

module Z {
    import Y = X.Y;

    var Y = 12;
}

//

module a {
  export type A = number;
}

module b {
  export import A = a.A;
  export module A {}
}

module c {
  import any = b.A;
}

//

module q {
  export const Q = {};
}

module r {
  export import Q = q.Q;
  export type Q = number;
}

module s {
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
