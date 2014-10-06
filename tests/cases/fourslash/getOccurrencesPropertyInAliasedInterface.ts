////module m {
////    export interface Foo {
////        [|abc|]
////    }
////}
////
////import Bar = m.Foo;
////
////export interface I extends Bar {
////    [|abc|]
////}
////
////class C implements Bar {
////    [|abc|]
////}
////
////(new C()).[|abc|];

test.ranges().forEach(r => {
    goTo.position(r.start);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range);
    });
    verify.occurrencesAtPositionCount(test.ranges().length);
});