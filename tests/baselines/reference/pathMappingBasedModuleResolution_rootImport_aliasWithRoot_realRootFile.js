//// [tests/cases/compiler/pathMappingBasedModuleResolution_rootImport_aliasWithRoot_realRootFile.ts] ////

//// [foo.ts]
export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo } from "/foo";
import { bar } from "/bar";


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { }
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
