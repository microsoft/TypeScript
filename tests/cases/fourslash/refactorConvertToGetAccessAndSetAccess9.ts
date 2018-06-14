/// <reference path='fourslash.ts' />

//// class A {
////     @foo
////     /*a*/public a: string = "foo";/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    @foo
    private /*RENAME*/_a: string = "foo";
    public get a(): string {
        return this._a;
    }
    public set a(value: string) {
        this._a = value;
    }
}`,
});
