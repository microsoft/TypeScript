//// [tests/cases/compiler/es6ImportDefaultBindingAmd.ts] ////

//// [es6ImportDefaultBindingAmd_0.ts]

var a = 10;
export = a;

//// [es6ImportDefaultBindingAmd_1.ts]
import defaultBinding from "es6ImportDefaultBindingAmd_0";
var x = defaultBinding;
import defaultBinding2 from "es6ImportDefaultBindingAmd_0"; // elide this import since defaultBinding2 is not used


//// [es6ImportDefaultBindingAmd_0.js]
define(["require", "exports"], function (require, exports) {
    var a = 10;
    return a;
});
//// [es6ImportDefaultBindingAmd_1.js]
define(["require", "exports", "es6ImportDefaultBindingAmd_0"], function (require, exports, defaultBinding) {
    var x = defaultBinding;
});


//// [es6ImportDefaultBindingAmd_0.d.ts]
declare var a: number;
export = a;
//// [es6ImportDefaultBindingAmd_1.d.ts]
import defaultBinding from "es6ImportDefaultBindingAmd_0";
import defaultBinding2 from "es6ImportDefaultBindingAmd_0";
