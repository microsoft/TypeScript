//// [test.ts]

import {foo} from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.js]
define(["require", "exports", "./foo"], function (require, exports, foo_1) {
    "use strict";
    const baz = 42;
    const bar = { foo: foo_1.foo, baz };
});


//// [test.d.ts]
