/// <reference path='fourslash.ts' />

//// class A {
////     public a_1: number;
////     constructor(public /*a*/a/*b*/: string) { }
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
    public a_1: number;
    constructor(private /*RENAME*/_a: string) { }
}`,
});

