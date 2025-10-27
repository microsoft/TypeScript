//// [tests/cases/conformance/externalModules/umd-augmentation-3.ts] ////

//// [index.d.ts]
export as namespace Math2d;

export = M2D;

declare namespace M2D {
	interface Point {
		x: number;
		y: number;
	}

	class Vector implements Point {
		x: number;
		y: number;
		constructor(x: number, y: number);

		translate(dx: number, dy: number): Vector;
	}

	function getLength(p: Vector): number;

}


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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="math2d-augment.d.ts" />
const m = __importStar(require("math2d"));
let v = new m.Vector(3, 2);
let magnitude = m.getLength(v);
let p = v.translate(5, 5);
p = v.reverse();
var t = p.x;
