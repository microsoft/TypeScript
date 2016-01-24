// @module: commonjs
// @target: ES5

// @filename: m1.ts
export default function foo() {

}

export default function bar() {

}

// @filename: m2.ts
import Entity from "./m1"

Entity();