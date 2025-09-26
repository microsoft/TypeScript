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
exports.Vec = Vec;
exports.Point2D = Point2D;
/**
 * @param {number} len
 */
function Vec(len) {
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
const source_1 = require("./source");
exports.origin = new source_1.Point2D(0, 0);
// export const res = Point2D(2, 3).dot(origin); // TODO: when __proto__ works, validate this


//// [source.d.ts]
/**
 * @param {number} len
 */
export declare function Vec(len: number): void;
/**
 * @param {number} x
 * @param {number} y
 */
export declare function Point2D(x: number, y: number): any;
//// [referencer.d.ts]
export declare const origin: any;
