//// [part1.ts]
module Root {
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
    }
}
//// [part2.ts]
module otherRoot {
    export module A {
        // have to be fully qualified since in different root
        export var Origin: Root.A.Point = { x: 0, y: 0 };

        export module Utils {
            export class Plane {
                constructor(public tl: Root.A.Point, public br: Root.A.Point) { }
            }
        }
    }
}

//// [part1.js]
var Root;
(function (Root) {
    (function (A) {
        (function (Utils) {
            function mirror(p) {
                return { x: p.y, y: p.x };
            }
            Utils.mirror = mirror;
        })(A.Utils || (A.Utils = {}));
        var Utils = A.Utils;
    })(Root.A || (Root.A = {}));
    var A = Root.A;
})(Root || (Root = {}));
//// [part2.js]
var otherRoot;
(function (otherRoot) {
    (function (A) {
        // have to be fully qualified since in different root
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
    })(otherRoot.A || (otherRoot.A = {}));
    var A = otherRoot.A;
})(otherRoot || (otherRoot = {}));
