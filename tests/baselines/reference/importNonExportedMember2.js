//// [tests/cases/compiler/importNonExportedMember2.ts] ////

//// [a.ts]
export {}
interface Foo {}

//// [b.ts]
import { Foo } from './a';


//// [a.js]
export {};
//// [b.js]
export {};
