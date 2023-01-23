//// [mapOnTupleTypes02.ts]
export type Point = [number, number];

export function increment(point: Point) {
  return point.map(d => d + 1);
}

//// [mapOnTupleTypes02.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increment = void 0;
function increment(point) {
    return point.map(function (d) { return d + 1; });
}
exports.increment = increment;


//// [mapOnTupleTypes02.d.ts]
export type Point = [number, number];
export declare function increment(point: Point): number[];
