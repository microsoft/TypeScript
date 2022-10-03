// @pretty: true
// @esModuleInterop: true
// @filename: foo.d.ts
declare function foo(): void;
declare namespace foo {}
export = foo;
// @filename: index.ts
import * as foo from "./foo";
function invoke(f: () => void) { f(); }
invoke(foo);
