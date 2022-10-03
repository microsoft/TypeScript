// @module: amd
// @declaration: true
// @target: ES5

// @filename: es6ImportDefaultBindingAmd_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBindingAmd_1.ts
import defaultBinding from "es6ImportDefaultBindingAmd_0";
var x = defaultBinding;
import defaultBinding2 from "es6ImportDefaultBindingAmd_0"; // elide this import since defaultBinding2 is not used
