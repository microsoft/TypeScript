// @module: commonjs
// @target: ES5

// @filename: es6ImportDefaultBindingMergeErrors_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBindingMergeErrors_1.ts
import defaultBinding from "./es6ImportDefaultBindingMergeErrors_0";
interface defaultBinding { // This is ok
}
var x = defaultBinding;
import defaultBinding2 from "./es6ImportDefaultBindingMergeErrors_0"; // Should be error
var defaultBinding2 = "hello world"; 
import defaultBinding3 from "./es6ImportDefaultBindingMergeErrors_0"; // Should be error
import defaultBinding3 from "./es6ImportDefaultBindingMergeErrors_0"; // SHould be error
