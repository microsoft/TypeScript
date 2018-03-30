/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/protected a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private a_1: string;
    protected get a(): string {
        return this.a_1;
    }
    protected set a(value: string) {
        this.a_1 = value;
    }
}`,
});
