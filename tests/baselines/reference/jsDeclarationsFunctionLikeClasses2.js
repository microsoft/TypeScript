//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionLikeClasses2.ts] ////

//// [source.js]
/**
 * @param {number} len
 */
export function Vec(len) {
    /**
     * @type {number[]}
     */
    this.storage = new Array(len);
}

Vec.prototype = {
    /**
     * @param {Vec} other
     */
    dot(other) {
        if (other.storage.length !== this.storage.length) {
            throw new Error(`Dot product only applicable for vectors of equal length`);
        }
        let sum = 0;
        for (let i = 0; i < this.storage.length; i++) {
            sum += (this.storage[i] * other.storage[i]);
        }
        return sum;
    },
    magnitude() {
        let sum = 0;
        for (let i = 0; i < this.storage.length; i++) {
            sum += (this.storage[i] ** 2);
        }
        return Math.sqrt(sum);
    }
}

/**
 * @param {number} x
 * @param {number} y
 */
export function Point2D(x, y) {
    if (!(this instanceof Point2D)) {
        return new Point2D(x, y);
    }
    Vec.call(this, 2);
    this.x = x;
    this.y = y;
}

Point2D.prototype = {
    __proto__: Vec,
    get x() {
        return this.storage[0];
    },
    /**
     * @param {number} x
     */
    set x(x) {
        this.storage[0] = x;
    },
    get y() {
        return this.storage[1];
    },
    /**
     * @param {number} y
     */
    set y(y) {
        this.storage[1] = y;
    }
};

//// [referencer.js]
import {Point2D} from "./source";

export const origin = new Point2D(0, 0);
// export const res = Point2D(2, 3).dot(origin); // TODO: when __proto__ works, validate this


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2D = exports.Vec = void 0;
/**
 * @param {number} len
 */
function Vec(len) {
    /**
     * @type {number[]}
     */
    this.storage = new Array(len);
}
exports.Vec = Vec;
Vec.prototype = {
    /**
     * @param {Vec} other
     */
    dot: function (other) {
        if (other.storage.length !== this.storage.length) {
            throw new Error("Dot product only applicable for vectors of equal length");
        }
        var sum = 0;
        for (var i = 0; i < this.storage.length; i++) {
            sum += (this.storage[i] * other.storage[i]);
        }
        return sum;
    },
    magnitude: function () {
        var sum = 0;
        for (var i = 0; i < this.storage.length; i++) {
            sum += (Math.pow(this.storage[i], 2));
        }
        return Math.sqrt(sum);
    }
};
/**
 * @param {number} x
 * @param {number} y
 */
function Point2D(x, y) {
    if (!(this instanceof Point2D)) {
        return new Point2D(x, y);
    }
    Vec.call(this, 2);
    this.x = x;
    this.y = y;
}
exports.Point2D = Point2D;
Point2D.prototype = {
    __proto__: Vec,
    get x() {
        return this.storage[0];
    },
    /**
     * @param {number} x
     */
    set x(x) {
        this.storage[0] = x;
    },
    get y() {
        return this.storage[1];
    },
    /**
     * @param {number} y
     */
    set y(y) {
        this.storage[1] = y;
    }
};
//// [referencer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.origin = void 0;
var source_1 = require("./source");
exports.origin = new source_1.Point2D(0, 0);
// export const res = Point2D(2, 3).dot(origin); // TODO: when __proto__ works, validate this


//// [source.d.ts]
/**
 * @param {number} len
 */
export function Vec(len: number): void;
export class Vec {
    /**
     * @param {number} len
     */
    constructor(len: number);
    /**
     * @type {number[]}
     */
    storage: number[];
    /**
     * @param {Vec} other
     */
    dot(other: Vec): number;
    magnitude(): number;
}
/**
 * @param {number} x
 * @param {number} y
 */
export function Point2D(x: number, y: number): Point2D;
export class Point2D {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    /**
     * @param {number} x
     */
    set x(arg: number);
    get x(): number;
    /**
     * @param {number} y
     */
    set y(arg: number);
    get y(): number;
    __proto__: typeof Vec;
}
//// [referencer.d.ts]
export const origin: Point2D;
import { Point2D } from "./source";
