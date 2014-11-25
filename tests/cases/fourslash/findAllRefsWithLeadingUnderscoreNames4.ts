/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|____bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|____bar|];


test.ranges().forEach(r1 => {
    goTo.position(r1.start);
    verify.referencesCountIs(2);

    test.ranges().forEach(r2 => {
        verify.referencesAtPositionContains(r2);
    });
});