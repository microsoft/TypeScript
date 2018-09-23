//// [exportImportAndClodule.ts]
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

//// [exportImportAndClodule.js]
var K = K || (K = {});
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
    })(L);
})(K);
var M = M || (M = {});
(function (M) {
    M.D = K.L;
})(M);
var o;
var o = new M.D('Hello');
var p;
var p;
