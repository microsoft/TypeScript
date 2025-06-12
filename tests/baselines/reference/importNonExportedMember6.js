//// [tests/cases/compiler/importNonExportedMember6.ts] ////

//// [a.ts]
class Foo {}
export = Foo;

//// [b.ts]
import { Foo } from './a';

//// [a.js]
class Foo {
}
export {};
//// [b.js]
export {};
