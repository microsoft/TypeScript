//// [tests/cases/compiler/deleteReadonlyInStrictNullChecks.ts] ////

//// [deleteReadonlyInStrictNullChecks.ts]
interface Function { readonly name: string; }
class Foo {}
delete Foo.name;


//// [deleteReadonlyInStrictNullChecks.js]
"use strict";
class Foo {
}
delete Foo.name;
