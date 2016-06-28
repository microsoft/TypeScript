/// <reference path='fourslash.ts' />

////let A = class Foo {
////    [|public|] foo;
////    [|public|] public;
////    constructor([|public|] y: string, private x: string) {
////    }
////    [|public|] method() { }
////    private method2() {}
////    [|public|] static static() { }
////}
////
////let B = class D {
////    constructor(private x: number) {
////    }
////    private test() {}
////    public test2() {}
////}

const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}
