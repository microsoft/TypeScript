/// <reference path='fourslash.ts' />

// @Filename: foo.ts
////let Foo: /*definition*/unresolved;
////type Foo = { x: string };

/////*reference*/Foo;


verify.baselineGoToType("reference");
