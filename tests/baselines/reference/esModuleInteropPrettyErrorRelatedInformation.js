//// [tests/cases/compiler/esModuleInteropPrettyErrorRelatedInformation.ts] ////

//// [foo.d.ts]
declare function foo(): void;
declare namespace foo {}
export = foo;
//// [index.ts]
import * as foo from "./foo";
function invoke(f: () => void) { f(); }
invoke(foo);


//// [index.js]
import * as foo from "./foo";
function invoke(f) { f(); }
invoke(foo);
