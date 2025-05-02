//// [tests/cases/compiler/mapOnTupleTypes02.ts] ////

//// [mapOnTupleTypes02.ts]
export type Point = [number, number];

export function increment(point: Point) {
  return point.map(d => d + 1);
}

//// [mapOnTupleTypes02.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increment = increment;
function increment(point) {
    return point.map(function (d) { return d + 1; });
}


//// [mapOnTupleTypes02.d.ts]
export type Point = [number, number];
export declare function increment(point: Point): number[];
