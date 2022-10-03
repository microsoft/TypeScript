// @filename: module.d.ts
declare module Point {
    export var Origin: { x: number; y: number; }
}

// @filename: function.d.ts
declare function Point(): { x: number; y: number; }

// @filename: test.ts
var cl: { x: number; y: number; }
var cl = Point();
var cl = Point.Origin;