//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesWithTheSameNameAndSameCommonRoot.ts] ////

//// [part1.ts]
module A {
    export interface Point {
        x: number;
        y: number;
    }

    export module Utils {
        export function mirror<T extends Point>(p: T) {
            return { x: p.y, y: p.x };
        }
    }
}

//// [part2.ts]
module A {
    export var Origin: Point = { x: 0, y: 0 };

    export module Utils {
        export class Plane {
            constructor(public tl: Point, public br: Point) { }
        }
    }
}

//// [part3.ts]
// test the merging actually worked

var o: { x: number; y: number };
var o: A.Point;
var o = A.Origin;
var o = A.Utils.mirror(o);

var p: { tl: A.Point; br: A.Point };
var p: A.Utils.Plane;
var p = new A.Utils.Plane(o, { x: 1, y: 1 });



//// [part1.js]
var A;
(function (A) {
    var Utils;
    (function (Utils) {
        function mirror(p) {
            return { x: p.y, y: p.x };
        }
        Utils.mirror = mirror;
    })(Utils = A.Utils || (A.Utils = {}));
})(A || (A = {}));
//// [part2.js]
var A;
(function (A) {
    A.Origin = { x: 0, y: 0 };
    var Utils;
    (function (Utils) {
        var Plane = /** @class */ (function () {
            function Plane(tl, br) {
                this.tl = tl;
                this.br = br;
            }
            return Plane;
        }());
        Utils.Plane = Plane;
    })(Utils = A.Utils || (A.Utils = {}));
})(A || (A = {}));
//// [part3.js]
// test the merging actually worked
var o;
var o;
var o = A.Origin;
var o = A.Utils.mirror(o);
var p;
var p;
var p = new A.Utils.Plane(o, { x: 1, y: 1 });
