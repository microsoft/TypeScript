//// [tests/cases/compiler/propertyAccess1.ts] ////

//// [propertyAccess1.ts]
declare var foo: { a: number; };
foo.a = 4;
foo.b = 5;

//// [propertyAccess1.js]
foo.a = 4;
foo.b = 5;
