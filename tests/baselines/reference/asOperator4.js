//// [tests/cases/conformance/expressions/asOperator/asOperator4.ts] ////

//// [foo.ts]
export function foo() { }

//// [bar.ts]
import { foo } from './foo';

// These should emit identically
<any>foo;
(foo as any);


//// [foo.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() { }
exports.foo = foo;
//// [bar.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("./foo");
// These should emit identically
foo_1.foo;
foo_1.foo;
