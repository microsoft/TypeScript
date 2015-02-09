//// [amdDependencyCommentName3.ts]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyCommentName3.js]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>
define(["require", "exports", "m2", "goo", "bar", "foo"], function (require, exports, m1, c, b) {
    m1.f();
});
