//// [tests/cases/compiler/propertyAccess3.ts] ////

//// [propertyAccess3.ts]
declare var foo: boolean;
foo.toBAZ();

//// [propertyAccess3.js]
foo.toBAZ();
