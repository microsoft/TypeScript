/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    public __bar;
////    public [|___bar|];
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x.__bar;
////x.[|___bar|];
////x.____bar;


test.ranges().forEach(r1 => {
    goTo.position(r1.start);
    verify.referencesCountIs(2);

    test.ranges().forEach(r2 => {
        verify.referencesAtPositionContains(r2);
    });
});