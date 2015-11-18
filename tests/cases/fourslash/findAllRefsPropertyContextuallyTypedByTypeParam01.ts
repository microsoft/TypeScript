/// <reference path="./fourslash.ts" />

////interface IFoo {
////    [|a|]: string;
////}
////class C<T extends IFoo> {
////    method() {
////        var x: T = {
////            [|a|]: ""
////        };
////        x.[|a|];
////    }
////}
////
////
////var x: IFoo = {
////    [|a|]: "ss"
////};

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}