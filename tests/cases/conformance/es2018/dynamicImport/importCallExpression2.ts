// @module: es2018
// @lib: es2015
// @filename: 0.ts
export function foo(){}

// @filename: 1.ts
import * as Zero from "./0"  // Should preserve ES2015 module syntax
import("./0");
var p1 = import("./0");
export default p1;
