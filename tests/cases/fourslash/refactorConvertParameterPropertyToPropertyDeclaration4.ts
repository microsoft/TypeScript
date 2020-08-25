//// class B {
//// }
//// class D extends B {
////     c = 10;
////     constructor(public a: string, /*a*/public readonly b: string/*b*/) {
////         super();
////     }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameter property to property declaration",
    actionName: "Convert parameter property to property declaration",
    actionDescription: "Convert parameter property to property declaration",
    newContent: `class B {
}
class D extends B {
    public readonly b: string;
    c = 10;
    constructor(public a: string, b: string) {
        super();
        this.b = b;
    }
}`
});
