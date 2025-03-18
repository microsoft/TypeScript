//// [tests/cases/compiler/restIntersection.ts] ////

//// [restIntersection.ts]
var intersection: { x: number, y: number } & { w: string, z: string };

var rest1: { y: number, w: string, z: string };
var {x, ...rest1 } = intersection;


//// [restIntersection.js]
var intersection;
var rest1;
var { x, ...rest1 } = intersection;
