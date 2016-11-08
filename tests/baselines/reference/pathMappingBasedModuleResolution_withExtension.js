//// [tests/cases/compiler/pathMappingBasedModuleResolution_withExtension.ts] ////

//// [foo.ts]

export function foo() {}

//// [a.ts]
import { foo } from "foo";


//// [foo.js]
"use strict";
function foo() { }
exports.foo = foo;
//// [a.js]
"use strict";
