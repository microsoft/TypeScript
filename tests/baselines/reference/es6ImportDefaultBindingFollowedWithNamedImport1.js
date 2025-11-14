//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport1.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport1_0.ts]
var a = 10;
export default a;

//// [es6ImportDefaultBindingFollowedWithNamedImport1_1.ts]
import defaultBinding1, { } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding1;
import defaultBinding2, { a } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding2;
import defaultBinding3, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding3;
import defaultBinding4, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding4;
import defaultBinding5, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding5;
import defaultBinding6, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1: number = defaultBinding6;


//// [es6ImportDefaultBindingFollowedWithNamedImport1_0.js]
var a = 10;
export default a;
//// [es6ImportDefaultBindingFollowedWithNamedImport1_1.js]
import defaultBinding1 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding1;
import defaultBinding2 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding2;
import defaultBinding3 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding3;
import defaultBinding4 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding4;
import defaultBinding5 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding5;
import defaultBinding6 from "es6ImportDefaultBindingFollowedWithNamedImport1_0";
var x1 = defaultBinding6;


//// [es6ImportDefaultBindingFollowedWithNamedImport1_0.d.ts]
declare var a: number;
export default a;
//// [es6ImportDefaultBindingFollowedWithNamedImport1_1.d.ts]
export {};
