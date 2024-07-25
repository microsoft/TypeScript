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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { }
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
