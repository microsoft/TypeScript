var intersection: { x: number, y: number } & { w: string, z: string };
var union: { a: number, c: boolean } | { a: string, b: string };


var rest1: { y: number, w: string, z: string };
var {x, ...rest1 } = intersection;

var rest2: { c: boolean } | { b: string };
var {a, ...rest2 } = union;

