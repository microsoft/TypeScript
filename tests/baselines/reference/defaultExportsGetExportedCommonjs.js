//// [tests/cases/conformance/es6/moduleExportsCommonjs/defaultExportsGetExportedCommonjs.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
"use strict";
class Foo {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;
//// [b.js]
"use strict";
function foo() { }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
