//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport1InEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0.ts]
var a = 10;
export default a;

//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_1.ts]
import defaultBinding1, { } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding1;
import defaultBinding2, { a } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding2;
import defaultBinding3, { a as b } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding3;
import defaultBinding4, { x, a as y } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding4;
import defaultBinding5, { x as z,  } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding5;
import defaultBinding6, { m,  } from "./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0";
var x: number = defaultBinding6;


//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 10;
exports.default = a;
//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_1 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_1.default;
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_2 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_2.default;
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_3 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_3.default;
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_4 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_4.default;
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_5 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_5.default;
var es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_6 = require("./es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0");
var x = es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0_6.default;


//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_0.d.ts]
declare var a: number;
export default a;
//// [es6ImportDefaultBindingFollowedWithNamedImport1InEs5_1.d.ts]
export {};
