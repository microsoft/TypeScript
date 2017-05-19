// @target: es5
// @module: commonjs
// @declaration: true

// @filename: exportStarFromEmptyModule_module1.ts
export class A {
    static r;
}

// @filename:exportStarFromEmptyModule_module2.ts
// empty

// @filename: exportStarFromEmptyModule_module3.ts
export * from "./exportStarFromEmptyModule_module2";
export * from "./exportStarFromEmptyModule_module1";

export class A {
    static q;
}

// @filename: exportStarFromEmptyModule_module4.ts
import * as X from "./exportStarFromEmptyModule_module3";
var s: X.A;
X.A.q;
X.A.r; // Error