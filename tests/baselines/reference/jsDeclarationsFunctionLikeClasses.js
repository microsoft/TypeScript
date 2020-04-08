//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionLikeClasses.ts] ////

//// [source.js]
/**
 * @param {number} x
 * @param {number} y
 */
export function Point(x, y) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
}

//// [referencer.js]
import {Point} from "./source";

/**
 * @param {Point} p
 */
export function magnitude(p) {
    return Math.sqrt(p.x ** 2 + p.y ** 2);
}


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
/**
 * @param {number} x
 * @param {number} y
 */
function Point(x, y) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
}
exports.Point = Point;
//// [referencer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magnitude = void 0;
/**
 * @param {Point} p
 */
function magnitude(p) {
    return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
}
exports.magnitude = magnitude;


//// [source.d.ts]
/**
 * @param {number} x
 * @param {number} y
 */
export function Point(x: number, y: number): Point;
export class Point {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    x: number;
    y: number;
}
//// [referencer.d.ts]
/**
 * @param {Point} p
 */
export function magnitude(p: Point): number;
import { Point } from "./source";
