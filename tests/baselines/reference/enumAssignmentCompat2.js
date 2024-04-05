//// [tests/cases/compiler/enumAssignmentCompat2.ts] ////

//// [enumAssignmentCompat2.ts]
enum W {

    a, b, c,

}

module W {
    export class D { }
}

interface WStatic {

    a: W;

    b: W;

    c: W;

}



var x: WStatic = W;
var y: typeof W = W;
var z: number = W; // error
var a: number = W.a;
var b: typeof W = W.a; // error
var c: typeof W.a = W.a;
var d: typeof W = 3; // error
var e: typeof W.a = 4;
var f: WStatic = W.a; // error
var g: WStatic = 5; // error
var h: W = 3;
var i: W = W.a;
i = W.a;
W.D;
var p: W.D;

//// [enumAssignmentCompat2.js]
var W;
(function (W) {
    W[W["a"] = 0] = "a";
    W[W["b"] = 1] = "b";
    W[W["c"] = 2] = "c";
})(W || (W = {}));
(function (W) {
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    W.D = D;
})(W || (W = {}));
var x = W;
var y = W;
var z = W; // error
var a = W.a;
var b = W.a; // error
var c = W.a;
var d = 3; // error
var e = 4;
var f = W.a; // error
var g = 5; // error
var h = 3;
var i = W.a;
i = W.a;
W.D;
var p;
