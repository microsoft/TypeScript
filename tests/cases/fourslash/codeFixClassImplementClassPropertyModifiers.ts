/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract x: number;
////    private y: number;
////    protected z: number;
////    public w: number;
////    public useY() { this.y; }
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
    public useY() { this.y; }
}

class C implements A {
    x: number;
    protected z: number;
    public w: number;
    public useY(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
