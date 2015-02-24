/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class /*1*/Class{
////}

//@Filename: b.ts
////import { /*2*/Class as /*3*/C2} from "a";
////
////var c = new C2();

//@Filename: c.ts
////export { /*4*/Class as /*5*/C3 } from "a";

goTo.file("a.ts");
goTo.marker("1");
verify.referencesCountIs(3);

goTo.file("b.ts");
goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(2);

goTo.file("c.ts");
goTo.marker("4");
verify.referencesCountIs(3);

goTo.marker("5");
verify.referencesCountIs(1);
