/// <reference path="fourslash.ts" />

//@Filename: a.ts
////var x: number;

//@Filename: b.ts
////var x: number;

//@Filename: c.ts
/////// <reference path="a.ts" />
/////// <reference path="b.ts" />
/////**/x++;

goTo.file("c.ts");
goTo.marker();

verify.definitionCountIs(2);