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
export var A;
(function (A) {
    let Utils;
    (function (Utils) {
        function mirror(p) {
            return { x: p.y, y: p.x };
        }
        Utils.mirror = mirror;
    })(Utils = A.Utils || (A.Utils = {}));
    A.Origin = { x: 0, y: 0 };
})(A || (A = {}));
//// [part2.js]
export var A;
(function (A) {
    // collision with 'Origin' var in other part of merged module
    A.Origin = { x: 0, y: 0 };
    let Utils;
    (function (Utils) {
        class Plane {
            tl;
            br;
            constructor(tl, br) {
                this.tl = tl;
                this.br = br;
            }
        }
        Utils.Plane = Plane;
    })(Utils = A.Utils || (A.Utils = {}));
})(A || (A = {}));
