//// [tests/cases/compiler/deleteReadonlyInStrictNullChecks.ts] ////

//// [deleteReadonlyInStrictNullChecks.ts]
interface Function { readonly name: string; }
class Foo {}
delete Foo.name;


//// [deleteReadonlyInStrictNullChecks.js]
class Foo {
}
delete Foo.name;
