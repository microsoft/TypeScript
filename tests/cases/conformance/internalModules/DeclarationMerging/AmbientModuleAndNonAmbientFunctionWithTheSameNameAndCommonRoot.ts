// @filename: module.d.ts
declare module Point {
    export var Origin: { x: number; y: number; }
}

// @filename: function.ts
function Point() {
    return { x: 0, y: 0 };
}

// @filename: test.ts
var cl: { x: number; y: number; }
var cl = Point();
var cl = Point.Origin;