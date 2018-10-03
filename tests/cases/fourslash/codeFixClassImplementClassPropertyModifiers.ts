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
    newFileContent:
`abstract class A {
    abstract x: number;
    private y: number;
    protected z: number;
    public w: number;
}

class C implements A {
    x: number;
    protected z: number;
    public w: number;
}`,
});
