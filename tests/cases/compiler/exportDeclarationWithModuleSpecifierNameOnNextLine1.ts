// @module: commonjs

// @filename: t1.ts
export var x = "x";

// @filename: t2.ts
export { x } from
    "./t1";

// @filename: t3.ts
export { } from
    "./t1";

// @filename: t4.ts
export { x as a } from
    "./t1";

// @filename: t5.ts
export { x as a, } from
    "./t1";