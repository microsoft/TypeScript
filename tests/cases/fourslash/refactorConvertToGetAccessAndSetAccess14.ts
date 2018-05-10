/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public readonly a: string = "foo";/*b*/
//// }

goTo.select("a", "b");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/_a: string = "foo";
    public get a(): string {
        return this._a;
    }
}`,
});
