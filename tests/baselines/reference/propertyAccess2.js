//// [tests/cases/compiler/propertyAccess2.ts] ////

//// [propertyAccess2.ts]
declare var foo: number;
foo.toBAZ();

//// [propertyAccess2.js]
foo.toBAZ();
