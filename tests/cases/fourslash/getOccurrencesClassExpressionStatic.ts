/// <reference path='fourslash.ts' />

////let A = class Foo {
////    public [|static|] foo;
////    [|static|] a;
////    constructor(public y: string, private x: string) {
////    }
////    public method() { }
////    private method2() {}
////    public [|static|] static() { }
////    private [|static|] static2() { }
////}
////
////let B = class D {
////    static a;
////    constructor(private x: number) {
////    }
////    private static test() {}
////    public static test2() {}
////}

verify.baselineDocumentHighlights();
