//// [tests/cases/compiler/esModuleInteropImportNamespace.ts] ////

//// [foo.d.ts]
declare function foo(): void;
declare namespace foo {}
export = foo;

//// [index.ts]
import * as foo from "./foo";
foo.default;


//// [index.js]
import * as foo from "./foo";
foo.default;
