// @module: commonjs
// @noImplicitReferences: true

// @filename: node_modules/math2d/index.d.ts
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

// @filename: math2d-augment.d.ts
import * as Math2d from 'math2d';
// Augment the module
declare module 'math2d' {
	// Add a method to the class
	interface Vector {
		reverse(): Math2d.Point;
	}
}

// @filename: b.ts
/// <reference path="math2d-augment.d.ts" />
import * as m from 'math2d';
let v = new m.Vector(3, 2);
let magnitude = m.getLength(v);
let p: m.Point = v.translate(5, 5);
p = v.reverse();
var t = p.x;
