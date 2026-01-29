//// [tests/cases/compiler/importNonExportedMember.ts] ////

//// [a.ts]
declare function foo(): any
declare function bar(): any;
export { foo, bar as baz };

//// [b.ts]
import { foo, bar } from "./a";


//// [a.js]
export { foo, bar as baz };
//// [b.js]
export {};
