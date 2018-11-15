/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/private _a: string;/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Generate 'get' and 'set' accessors",
    actionName: "Generate 'get' and 'set' accessors",
    actionDescription: "Generate 'get' and 'set' accessors",
    newContent: `class A {
    private _a: string;
    public get /*RENAME*/a(): string {
        return this._a;
    }
    public set a(value: string) {
        this._a = value;
    }
}`,
});
