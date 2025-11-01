//// [tests/cases/conformance/externalModules/umd-augmentation-1.ts] ////

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

//// [b.ts]
/// <reference path="math2d-augment.d.ts" />
import * as m from 'math2d';
let v = new m.Vector(3, 2);
let magnitude = m.getLength(v);
let p: m.Point = v.translate(5, 5);
p = v.reverse();
var t = p.x;


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="math2d-augment.d.ts" />
var m = require("math2d");
var v = new m.Vector(3, 2);
var magnitude = m.getLength(v);
var p = v.translate(5, 5);
p = v.reverse();
var t = p.x;
