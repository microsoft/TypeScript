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
    private _a_1: string;
    protected get _a(): string {
        return this._a_1;
    }
    protected set _a(value: string) {
        this._a_1 = value;
    }
}`,
});
