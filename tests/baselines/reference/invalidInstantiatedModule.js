//// [invalidInstantiatedModule.ts]
module M {
    export class Point { x: number; y: number }
    export var Point = 1;  // Error
}

module M2 {
    export interface Point { x: number; y: number }
    export var Point = 1;
}

var m = M2;
var p: m.Point; // Error


 

//// [invalidInstantiatedModule.js]
var M;
(function (M) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    M.Point = Point;
    M.Point = 1; // Error
})(M || (M = {}));
var M2;
(function (M2) {
    M2.Point = 1;
})(M2 || (M2 = {}));
var m = M2;
var p; // Error
