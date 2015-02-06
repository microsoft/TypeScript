//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport1InEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0.ts]

var a = 10;
export = a;

//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_1.ts]
import defaultBinding1, { } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding1;
import defaultBinding2, { a } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding2;
import defaultBinding3, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding3;
import defaultBinding4, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding4;
import defaultBinding5, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding5;
import defaultBinding6, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding6;


//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0.js]
var a = 10;
module.exports = a;
//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_1.js]
var x = defaultBinding1;
var x = defaultBinding2;
var x = defaultBinding3;
var x = defaultBinding4;
var x = defaultBinding5;
var x = defaultBinding6;
