//// [amdDependencyComment1.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyComment1.js]
"use strict";
///<amd-dependency path='bar'/>
exports.__esModule = true;
var m1 = require("m2");
m1.f();
