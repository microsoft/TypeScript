//// [tests/cases/compiler/es6ImportDefaultBindingInEs5.ts] ////

//// [es6ImportDefaultBindingInEs5_0.ts]

export var a = 10;

//// [es6ImportDefaultBindingInEs5_1.ts]
import defaultBinding from "es6ImportDefaultBindingInEs5_0";

//// [es6ImportDefaultBindingInEs5_0.js]
exports.a = 10;
//// [es6ImportDefaultBindingInEs5_1.js]
