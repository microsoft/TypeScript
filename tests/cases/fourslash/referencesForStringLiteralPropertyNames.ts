/// <reference path='fourslash.ts'/>

////class Foo {
////    public /*1*/"ss": any;
////}
////
////var x: Foo;
////x.ss;
////x[/*2*/"ss"];
////x = { "ss": 0 };
////x = { /*3*/ss: 0 };

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(5);
});
