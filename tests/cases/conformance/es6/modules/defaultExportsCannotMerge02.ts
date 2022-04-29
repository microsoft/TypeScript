// @module: commonjs
// @target: ES5

// @filename: m1.ts
export default class Decl {
}

export interface Decl {
    p1: number;
    p2: number;
}

export namespace Decl {
    interface I {
    }
}

// @filename: m2.ts
import Entity from "m1"

Entity();

var x: Entity;
var y: Entity.I;
var z = new Entity();
var sum = z.p1 + z.p2