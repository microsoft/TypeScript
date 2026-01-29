//// [tests/cases/compiler/importNonExportedMember3.ts] ////

//// [a.ts]
export {}
interface Foo {}
interface Foo {}
namespace Foo {}

//// [b.ts]
import { Foo } from './a';


//// [a.js]
export {};
//// [b.js]
export {};
