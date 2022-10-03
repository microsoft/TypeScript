// @target: es6
// @declaration: true
// @declaration: true

// @filename: es6ImportDefaultBinding_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBinding_1.ts
import defaultBinding from "es6ImportDefaultBinding_0";
var x = defaultBinding;
import defaultBinding2 from "es6ImportDefaultBinding_0"; // elide this import since defaultBinding2 is not used
