//// [amdDependencyCommentName2.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName2.js]
///<amd-dependency path='bar' name='b'/>
define(["require", "exports", "m2", "bar"], function (require, exports, m1, b) {
    m1.f();
});
