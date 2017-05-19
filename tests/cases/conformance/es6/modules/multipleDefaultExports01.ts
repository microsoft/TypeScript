// @module: commonjs
// @target: ES5

// @filename: m1.ts
export default class foo {

}

export default function bar() {

}

var x = 10;
export default x;

// @filename: m2.ts
import Entity from "./m1"

Entity();