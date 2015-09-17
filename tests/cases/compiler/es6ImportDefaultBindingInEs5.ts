// @target: es5
// @module: commonjs
// @declaration: true

// @filename: es6ImportDefaultBindingInEs5_0.ts
var a = 10;
export = a;

// @filename: es6ImportDefaultBindingInEs5_1.ts
import defaultBinding from "./es6ImportDefaultBindingInEs5_0";