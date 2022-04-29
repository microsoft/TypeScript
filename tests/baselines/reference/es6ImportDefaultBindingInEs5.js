//// [tests/cases/compiler/es6ImportDefaultBindingInEs5.ts] ////

//// [es6ImportDefaultBindingInEs5_0.ts]
var a = 10;
export = a;

//// [es6ImportDefaultBindingInEs5_1.ts]
import defaultBinding from "./es6ImportDefaultBindingInEs5_0";

//// [es6ImportDefaultBindingInEs5_0.js]
"use strict";
var a = 10;
module.exports = a;
//// [es6ImportDefaultBindingInEs5_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [es6ImportDefaultBindingInEs5_0.d.ts]
declare var a: number;
export = a;
//// [es6ImportDefaultBindingInEs5_1.d.ts]
export {};
