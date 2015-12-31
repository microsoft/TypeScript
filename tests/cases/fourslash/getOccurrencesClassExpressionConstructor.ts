/// <reference path='fourslash.ts' />

////let A = class Foo {
////    [|constructor|]();
////    [|constructor|](x: number);
////    [|constructor|](y: string);
////    [|constructor|](a?: any) {
////    }
////}
////
////let B = class D {
////    constructor(x: number) {
////    }
////}

const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}
