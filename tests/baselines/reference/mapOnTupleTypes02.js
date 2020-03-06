//// [mapOnTupleTypes02.ts]
export type Point = [number, number];

export function increment(point: Point) {
  return point.map(d => d + 1);
}

//// [mapOnTupleTypes02.js]
"use strict";
exports.__esModule = true;
exports.increment = void 0;
function increment(point) {
    return point.map(function (d) { return d + 1; });
}
exports.increment = increment;


//// [mapOnTupleTypes02.d.ts]
export declare type Point = [number, number];
export declare function increment(point: Point): number[];
