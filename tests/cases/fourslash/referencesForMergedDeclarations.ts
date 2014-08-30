/// <reference path='fourslash.ts'/>

////interface /*type1*/Foo {
////}
////
////module /*namespace1*/Foo {
////    export interface Bar { }
////}
////
////function /*value1*/Foo(): void {
////}
////
////var f1: /*namespace2*/Foo.Bar;
////var f2: /*type2*/Foo;
/////*value2*/Foo.bind(this);


test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(2);
});
