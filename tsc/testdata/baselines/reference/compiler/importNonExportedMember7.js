//// [tests/cases/compiler/importNonExportedMember7.ts] ////

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
