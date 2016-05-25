/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export var /*1*/a;

// @Filename: b.ts
////import { /*2*/a } from './a';
////export { /*3*/a };

goTo.file("a.ts");
goTo.marker("1");

goTo.file("b.ts");
goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);