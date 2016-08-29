/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// /*2*/export class Foo {}

// @Filename: b.ts
//// /*3*/import n = require('a');
//// var x = new /*1*/n.Foo();

// Won't-fixed: Should go to '2' instead
verify.goToDefinition("1", "3");
goTo.marker('1');
