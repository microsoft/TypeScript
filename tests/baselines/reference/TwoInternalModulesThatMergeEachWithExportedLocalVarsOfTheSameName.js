//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedLocalVarsOfTheSameName.ts] ////

//// [part1.ts]
export module A {
    export interface Point {
        x: number;
        y: number;
    }

    export module Utils {
        export function mirror<T extends Point>(p: T) {
            return { x: p.y, y: p.x };
        }
    }

    export var Origin: Point = { x: 0, y: 0 };
}

//// [part2.ts]
export module A {
    // collision with 'Origin' var in other part of merged module
    export var Origin: Point = { x: 0, y: 0 };

    export module Utils {
        export class Plane {
            constructor(public tl: Point, public br: Point) { }
        }
    }
}


//// [part1.js]
(function (A) {
    (function (Utils) {
        function mirror(p) {
            return { x: p.y, y: p.x };
        }
        Utils.mirror = mirror;
    })(A.Utils || (A.Utils = {}));
    var Utils = A.Utils;
    A.Origin = { x: 0, y: 0 };
})(exports.A || (exports.A = {}));
var A = exports.A;
//// [part2.js]
(function (A) {
    A.Origin = { x: 0, y: 0 };
    (function (Utils) {
        var Plane = (function () {
            function Plane(tl, br) {
                this.tl = tl;
                this.br = br;
            }
            return Plane;
        })();
        Utils.Plane = Plane;
    })(A.Utils || (A.Utils = {}));
    var Utils = A.Utils;
})(exports.A || (exports.A = {}));
var A = exports.A;
