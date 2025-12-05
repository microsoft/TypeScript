//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesWithTheSameNameAndDifferentCommonRoot.ts] ////

//// [part1.ts]
namespace Root {
    export namespace A {
        export interface Point {
            x: number;
            y: number;
        }

        export namespace Utils {
            export function mirror<T extends Point>(p: T) {
                return { x: p.y, y: p.x };
            }
        }
    }
}

//// [part2.ts]
namespace otherRoot {
    export namespace A {
        // have to be fully qualified since in different root
        export var Origin: Root.A.Point = { x: 0, y: 0 };

        export namespace Utils {
            export class Plane {
                constructor(public tl: Root.A.Point, public br: Root.A.Point) { }
            }
        }
    }
}

//// [part1.js]
var Root;
(function (Root) {
    var A;
    (function (A) {
        var Utils;
        (function (Utils) {
            function mirror(p) {
                return { x: p.y, y: p.x };
            }
            Utils.mirror = mirror;
        })(Utils = A.Utils || (A.Utils = {}));
    })(A = Root.A || (Root.A = {}));
})(Root || (Root = {}));
//// [part2.js]
var otherRoot;
(function (otherRoot) {
    var A;
    (function (A) {
        // have to be fully qualified since in different root
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
    })(A = otherRoot.A || (otherRoot.A = {}));
})(otherRoot || (otherRoot = {}));
