/// <reference path='fourslash.ts' />

// @Filename: quickInfoExportAssignmentOfGenericInterface_0.ts
////interface Foo<T> {
////    a: string;
////}
////export = Foo;

// @Filename: quickInfoExportAssignmentOfGenericInterface_1.ts
////import a = require('./quickInfoExportAssignmentOfGenericInterface_0');
////export var /*1*/x: a<a<string>>;
////x.a;

verify.quickInfoAt("1", "var x: a<a<string>>");
