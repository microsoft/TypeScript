//// [tests/cases/compiler/pathMappingBasedModuleResolution_withExtension.ts] ////

//// [foo.ts]
export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo } from "foo";
import { bar } from "bar";


//// [foo.js]
export function foo() { }
//// [bar.js]
export function bar() { }
//// [a.js]
export {};
