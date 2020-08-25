//// class D {
////     c = 10;
////     constructor(public /*a*/a/*b*/: string, public readonly b: string) {
////     }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameter property to property declaration",
    actionName: "Convert parameter property to property declaration",
    actionDescription: "Convert parameter property to property declaration",
    newContent: `class D {
    public a: string;
    c = 10;
    constructor(a: string, public readonly b: string) {
        this.a = a;
    }
}`
});

