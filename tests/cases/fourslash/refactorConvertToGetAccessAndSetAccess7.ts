/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/protected _a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private /*RENAME*/__a: string;
    protected get _a(): string {
        return this.__a;
    }
    protected set _a(value: string) {
        this.__a = value;
    }
}`,
});
