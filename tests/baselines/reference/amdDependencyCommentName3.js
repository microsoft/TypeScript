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
define(["require", "exports", "m2", "foo", "bar", "goo"], function (require, exports, m1, b, c) {
    m1.f();
});
