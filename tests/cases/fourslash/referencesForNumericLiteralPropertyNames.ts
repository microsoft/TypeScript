/// <reference path='fourslash.ts'/>

////class Foo {
////    public /*1*/12: any;
////}
////
////var x: Foo;
////x[/*2*/12];
////x = { "12": 0 };
////x = { /*3*/12: 0 };

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(4);
});
