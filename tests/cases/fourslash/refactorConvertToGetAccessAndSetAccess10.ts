/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public a?: string = "foo";/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private a_1?: string = "foo";
    public get a(): string {
        return this.a_1;
    }
    public set a(value: string) {
        this.a_1 = value;
    }
}`,
});
