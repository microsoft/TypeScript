/// <reference path='fourslash.ts'/>

////interface One {
////    common: { /*1*/a: number; };
////}
////
////interface Base {
////    /*2*/a: string;
////    b: string;
////}
////
////interface HasAOrB extends Base {
////    /*3*/a: string;
////    b: string;
////}
////
////interface Two {
////    common: HasAOrB;
////}
////
////var x : One | Two;
////
////x.common./*4*/a;

goTo.marker("1");
verify.referencesCountIs(2); // One.common.a, x.common.a

goTo.marker("2");
verify.referencesCountIs(3); // Base.a, HasAOrB.a, x.common.a

goTo.marker("3");
verify.referencesCountIs(3); // Base.a, HasAOrB.a, x.common.a

goTo.marker("4");
verify.referencesCountIs(4); // One.common.a, Base.a, HasAOrB.a, x.common.a