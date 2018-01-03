/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract x: number;
////    private y: number;
////    protected z: number;
////    public w: number;
////}
////
////class C implements A {[| |]}

verify.codeFix({
    description: "Implement interface 'A'",
    // TODO: GH#18445
    newFileContent:
`abstract class A {
    abstract x: number;
    private y: number;
    protected z: number;
    public w: number;
}

class C implements A {\r
    x: number;\r
    protected z: number;\r
    public w: number;\r
}`,
});
