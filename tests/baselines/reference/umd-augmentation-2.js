//// [tests/cases/conformance/externalModules/umd-augmentation-2.ts] ////

//// [index.d.ts]
export as namespace Math2d;

export interface Point {
	x: number;
	y: number;
}

export class Vector implements Point {
	x: number;
	y: number;
	constructor(x: number, y: number);

	translate(dx: number, dy: number): Vector;
}

export function getLength(p: Vector): number;

//// [math2d-augment.d.ts]
import * as Math2d from 'math2d';
// Augment the module
declare module 'math2d' {
	// Add a method to the class
	interface Vector {
		reverse(): Math2d.Point;
	}
}

//// [a.ts]
/// <reference path="node_modules/math2d/index.d.ts" />
/// <reference path="math2d-augment.d.ts" />
let v = new Math2d.Vector(3, 2);
let magnitude = Math2d.getLength(v);
let p: Math2d.Point = v.translate(5, 5);
p = v.reverse();
var t = p.x;


//// [a.js]
/// <reference path="node_modules/math2d/index.d.ts" />
/// <reference path="math2d-augment.d.ts" />
var v = new Math2d.Vector(3, 2);
var magnitude = Math2d.getLength(v);
var p = v.translate(5, 5);
p = v.reverse();
var t = p.x;
