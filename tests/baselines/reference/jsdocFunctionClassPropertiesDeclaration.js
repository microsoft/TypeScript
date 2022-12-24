//// [a.js]
/**
 * @param {number | undefined} x
 * @param {number | undefined} y
 */
export function Foo(x, y) {
    if (!(this instanceof Foo)) {
        return new Foo(x, y);
    }
    this.x = x;
    this.y = y;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
/**
 * @param {number | undefined} x
 * @param {number | undefined} y
 */
function Foo(x, y) {
    if (!(this instanceof Foo)) {
        return new Foo(x, y);
    }
    this.x = x;
    this.y = y;
}
exports.Foo = Foo;


//// [a.d.ts]
/**
 * @param {number | undefined} x
 * @param {number | undefined} y
 */
export function Foo(x: number | undefined, y: number | undefined): Foo;
export class Foo {
    /**
     * @param {number | undefined} x
     * @param {number | undefined} y
     */
    constructor(x: number | undefined, y: number | undefined);
    x: number | undefined;
    y: number | undefined;
}
