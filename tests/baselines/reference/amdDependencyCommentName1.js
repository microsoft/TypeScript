//// [amdDependencyCommentName1.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName1.js]
"use strict";
///<amd-dependency path='bar' name='b'/>
exports.__esModule = true;
var m1 = require("m2");
m1.f();
