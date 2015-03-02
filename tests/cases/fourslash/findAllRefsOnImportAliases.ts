/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class /*1*/Class{
////}

//@Filename: b.ts
////import { /*2*/Class } from "a";
////
////var c = new /*3*/Class();

//@Filename: c.ts
////export { /*4*/Class } from "a";

goTo.file("a.ts");
goTo.marker("1");
verify.referencesCountIs(4);

goTo.file("b.ts");
goTo.marker("2");
verify.referencesCountIs(4);

goTo.marker("3");
verify.referencesCountIs(4);

goTo.file("c.ts");
goTo.marker("4");
verify.referencesCountIs(4);

