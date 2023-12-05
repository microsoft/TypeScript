//// [tests/cases/conformance/internalModules/importDeclarations/exportImportAlias.ts] ////

//// [exportImportAlias.ts]
// expect no errors here

module A {

    export var x = 'hello world'
    export class Point {
        constructor(public x: number, public y: number) { }
    }
    export module B {
        export interface Id {
            name: string;
        }
    }
}

module C {
    export import a = A;
}

var a: string = C.a.x;
var b: { x: number; y: number; } = new C.a.Point(0, 0);
var c: { name: string };
var c: C.a.B.Id;

module X {
    export function Y() {
        return 42;
    }

    export module Y {
        export class Point {
            constructor(public x: number, public y: number) { }
        }
    }
}

module Z {

    // 'y' should be a fundule here
    export import y = X.Y;
}

var m: number = Z.y();
var n: { x: number; y: number; } = new Z.y.Point(0, 0);

module K {
    export class L {
        constructor(public name: string) { }
    }

    export module L {
        export var y = 12;
        export interface Point {
            x: number;
            y: number;
        }
    }
}

module M {
    export import D = K.L;
}

var o: { name: string };
var o = new M.D('Hello');

var p: { x: number; y: number; }
var p: M.D.Point;

//// [exportImportAlias.js]
// expect no errors here
var A;
(function (A) {
    A.x = 'hello world';
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    A.Point = Point;
})(A || (A = {}));
var C;
(function (C) {
    C.a = A;
})(C || (C = {}));
var a = C.a.x;
var b = new C.a.Point(0, 0);
var c;
var c;
var X;
(function (X) {
    function Y() {
        return 42;
    }
    X.Y = Y;
    (function (Y) {
        var Point = /** @class */ (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        }());
        Y.Point = Point;
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
var Z;
(function (Z) {
    // 'y' should be a fundule here
    Z.y = X.Y;
})(Z || (Z = {}));
var m = Z.y();
var n = new Z.y.Point(0, 0);
var K;
(function (K) {
    var L = /** @class */ (function () {
        function L(name) {
            this.name = name;
        }
        return L;
    }());
    K.L = L;
    (function (L) {
        L.y = 12;
    })(L = K.L || (K.L = {}));
})(K || (K = {}));
var M;
(function (M) {
    M.D = K.L;
})(M || (M = {}));
var o;
var o = new M.D('Hello');
var p;
var p;
