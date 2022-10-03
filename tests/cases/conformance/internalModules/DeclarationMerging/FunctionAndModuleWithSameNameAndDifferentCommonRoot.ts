// @filename: function.ts
module A {
    export function Point() {
        return { x: 0, y: 0 };
    }
}

// @filename: module.ts
module B {
    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

// @filename: test.ts
var fn: () => { x: number; y: number };
var fn = A.Point;

var cl: { x: number; y: number; }
var cl = B.Point.Origin;
