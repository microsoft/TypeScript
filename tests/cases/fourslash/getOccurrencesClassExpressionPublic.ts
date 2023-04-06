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

verify.baselineDocumentHighlights();
