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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A;
(function (A) {
    var Utils;
    (function (Utils) {
        function mirror(p) {
            return { x: p.y, y: p.x };
        }
        Utils.mirror = mirror;
    })(Utils = A.Utils || (A.Utils = {}));
    A.Origin = { x: 0, y: 0 };
})(A || (exports.A = A = {}));
//// [part2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A;
(function (A) {
    // collision with 'Origin' var in other part of merged module
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
})(A || (exports.A = A = {}));
