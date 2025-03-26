//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport_0.ts]
export var a = 10;
export var x = a;
export var m = a;
export default {};

//// [es6ImportDefaultBindingFollowedWithNamedImport_1.ts]
import defaultBinding1, { } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding2, { a } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = a;
import defaultBinding3, { a as b } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = b;
import defaultBinding4, { x, a as y } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = x;
var x1: number = y;
import defaultBinding5, { x as z,  } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = z;
import defaultBinding6, { m,  } from "./es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = m;


//// [es6ImportDefaultBindingFollowedWithNamedImport_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = exports.x = exports.a = void 0;
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
exports.default = {};
//// [es6ImportDefaultBindingFollowedWithNamedImport_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es6ImportDefaultBindingFollowedWithNamedImport_0_1 = require("./es6ImportDefaultBindingFollowedWithNamedImport_0");
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_1.a;
const es6ImportDefaultBindingFollowedWithNamedImport_0_2 = require("./es6ImportDefaultBindingFollowedWithNamedImport_0");
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_2.a;
const es6ImportDefaultBindingFollowedWithNamedImport_0_3 = require("./es6ImportDefaultBindingFollowedWithNamedImport_0");
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_3.x;
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_3.a;
const es6ImportDefaultBindingFollowedWithNamedImport_0_4 = require("./es6ImportDefaultBindingFollowedWithNamedImport_0");
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_4.x;
const es6ImportDefaultBindingFollowedWithNamedImport_0_5 = require("./es6ImportDefaultBindingFollowedWithNamedImport_0");
var x1 = es6ImportDefaultBindingFollowedWithNamedImport_0_5.m;
