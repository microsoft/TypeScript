//// [tests/cases/conformance/es6/moduleExportsCommonjs/defaultExportsGetExportedCommonjs.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
"use strict";
class Foo {
}
exports.default = Foo;
//// [b.js]
"use strict";
function foo() { }
exports.default = foo;
