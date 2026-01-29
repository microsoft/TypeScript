//// [tests/cases/compiler/pathMappingBasedModuleResolution_rootImport_aliasWithRoot_multipleAliases.ts] ////

//// [foo.ts]
export function foo() {}

//// [bar.js]
export function bar() {}

//// [a.ts]
import { foo } from "/import/foo";
import { bar } from "/client/bar";


//// [foo.js]
export function foo() { }
//// [bar.js]
export function bar() { }
//// [a.js]
export {};
