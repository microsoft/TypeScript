/// <reference path='fourslash.ts' />

//// class A {
////     constructor(private /*a*/a/*b*/: string) { }
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    public get a(): string {
        return this._a;
    }
    public set a(value: string) {
        this._a = value;
    }
    constructor(private /*RENAME*/_a: string) { }
}`,
});
