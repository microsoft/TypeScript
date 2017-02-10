//// [amdDependencyComment1.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyComment1.js]
///<amd-dependency path='bar'/>
"use strict";
exports.__esModule = true;
var m1 = require("m2");
m1.f();
