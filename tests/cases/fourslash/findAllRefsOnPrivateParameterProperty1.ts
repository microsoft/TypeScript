/// <reference path="fourslash.ts" />

////class ABCD {
////    constructor(private x: number, public y: number, private [|z|]: number) {
////    }
////
////    func() {
////        return this.[|z|];
////    }
////}

test.ranges().forEach(r => {
    goTo.position(r.start);

    test.ranges().forEach(range => {
        verify.referencesAtPositionContains(range);
    });
});
