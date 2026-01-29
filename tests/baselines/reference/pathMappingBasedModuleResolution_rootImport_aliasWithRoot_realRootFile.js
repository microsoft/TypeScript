//// [tests/cases/compiler/pathMappingBasedModuleResolution_rootImport_aliasWithRoot_realRootFile.ts] ////

//// [foo.ts]
export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo } from "/foo";
import { bar } from "/bar";


//// [foo.js]
export function foo() { }
//// [a.js]
export {};
