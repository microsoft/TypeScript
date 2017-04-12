//// [tests/cases/compiler/es6ImportDefaultBindingMergeErrors.ts] ////

//// [es6ImportDefaultBindingMergeErrors_0.ts]
var a = 10;
export default a;

//// [es6ImportDefaultBindingMergeErrors_1.ts]
import defaultBinding from "./es6ImportDefaultBindingMergeErrors_0";
interface defaultBinding { // This is ok
}
var x = defaultBinding;
import defaultBinding2 from "./es6ImportDefaultBindingMergeErrors_0"; // Should be error
var defaultBinding2 = "hello world"; 
import defaultBinding3 from "./es6ImportDefaultBindingMergeErrors_0"; // Should be error
import defaultBinding3 from "./es6ImportDefaultBindingMergeErrors_0"; // SHould be error


//// [es6ImportDefaultBindingMergeErrors_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 10;
exports.default = a;
//// [es6ImportDefaultBindingMergeErrors_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6ImportDefaultBindingMergeErrors_0_1 = require("./es6ImportDefaultBindingMergeErrors_0");
var x = es6ImportDefaultBindingMergeErrors_0_1.default;
var defaultBinding2 = "hello world";
