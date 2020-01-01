//// [destructuringSamePropertyTwice.ts]
'use strict';
let { foo, foo: bar } = { foo: 1 };
({ foo, foo: bar } = { foo: 2 });

//// [destructuringSamePropertyTwice.js]
'use strict';
var _a;
var _b = { foo: 1 }, foo = _b.foo, bar = _b.foo;
(_a = { foo: 2 }, foo = _a.foo, bar = _a.foo);
