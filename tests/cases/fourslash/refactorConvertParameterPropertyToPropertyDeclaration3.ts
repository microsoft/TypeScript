//// class D {
////     c = 10;
////     constructor(public a: string, /*a*/public readonly b: string/*b*/) {
////     }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameter property to property declaration",
    actionName: "Convert parameter property to property declaration",
    actionDescription: "Convert parameter property to property declaration",
    newContent: `class D {
    public readonly b: string;
    c = 10;
    constructor(public a: string, b: string) {
        this.b = b;
    }
}`
});

