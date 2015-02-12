//// [amdDependencyCommentName1.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName1.js]
///<amd-dependency path='bar' name='b'/>
var m1 = require("m2");
m1.f();
