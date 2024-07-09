// @module: commonjs
// @target: ES5

// @filename: m1.ts
export default function Decl() {
    return 0;
}

export interface Decl {
    p1: number;
    p2: number;
}

export namespace Decl {
    export var x = 10;
    export var y = 20;

    interface I {
    }
}

// @filename: m2.ts
import Entity from "m1"

Entity();

var x: Entity;
var y: Entity.I;

Entity.x;
Entity.y;