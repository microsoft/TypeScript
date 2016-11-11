//// [tests/cases/compiler/pathMappingBasedModuleResolution_withExtension.ts] ////

//// [foo.ts]

export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo } from "foo";
import { bar } from "bar";


//// [foo.js]
"use strict";
function foo() { }
exports.foo = foo;
//// [bar.js]
"use strict";
function bar() { }
exports.bar = bar;
//// [a.js]
"use strict";
